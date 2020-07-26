import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Notification from '../common-components/Notification';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import styles from './styles/LogIn';
import InputField from '../common-components/InputField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { getUser } from '../graphql/queries'
import { createUser } from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import { Auth } from 'aws-amplify';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      badgeNumber: '',
      username: '',
      confirmationCode: '',
      validUsername: false,
      validBadgeNumber: false,
      validPassword: false,
      showErrorMessage: false,
      errorMessage: '',
      resolutionMessage: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onCreatePoliceAccount = this.onCreatePoliceAccount.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  signIn = async () => {
    const {
      username, password
    } = this.state
    try {
      const userFromAuth = await Auth.signIn({ username, password })
      console.log('successful signed in..')
      
      console.log("Here is user 1");
      // FIXME: STOPS RIGHT HERE
      
      //Grab userobject from dynamo
      const result = await API.graphql(graphqlOperation(getUser, {id:userFromAuth.signInUserSession.idToken.payload.sub}));
      console.log("Here is user");

      let user = result.data.getUser;
      console.log(user);
      //if userobject was not found
      if(!user){
         //establish user object to be saved to dynamo
         console.log("User object not found");
        let userObject = {
          id:userFromAuth.signInUserSession.idToken.payload.sub,
          profileImageKey:'',
          username:this.state.username,
          email: this.state.username,
          first_name:userFromAuth.signInUserSession.idToken.payload.given_name,
          last_name:userFromAuth.signInUserSession.idToken.payload.family_name,
          documents:[]
        };
        //access dynamo through graphql
        await API.graphql(graphqlOperation(createUser, {input: userObject}));
        this.props.setUser(userObject);
        this.props.setLoggedIn(true);
        return;
      }

      //if user object already exists
      if(user.createdAt)
        delete user.createdAt;
      if(user.updatedAt)
        delete user.updatedAt;
      console.log(user)
      this.props.setUser(user);
      this.props.setLoggedIn(true);
    } catch (err) {
      this.setState({showErrorMessage: true})
      if (err.code === 'UserNotConfirmedException') {
        this.setState({errorMessage: "Looks like we still need to verify your account"})
        this.setState({resolutionMessage: "Check your email for a message from us"})
      } else if (err.code === 'PasswordResetRequiredException') {
        this.setState({errorMessage: "Looks like we need to reset your password"})
        this.setState({resolutionMessage: "Please click 'Forgot Password' above"})
      } else if (err.code === 'NotAuthorizedException') {
        this.setState({errorMessage: "Looks like that's not the right password"})
        this.setState({resolutionMessage: "Please try a different one or select 'Forgot Password'"})
      } else if (err.code === 'UserNotFoundException') {
        this.setState({errorMessage: "Looks like we couldn't find your account"})
        this.setState({resolutionMessage: "Please try a different email address"})
      } else {
        console.log(err);
        this.setState({errorMessage: "Looks like something went wrong"})
        this.setState({resolutionMessage: "Please try again"})
      }
    }
  }

  handleEmailChange(text) {
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ emailAddress: text });
    this.setState({ username: text });
    text.match(emailformat) ? this.setState({ validEmail: true }) : this.setState({ validEmail: false });
  }


  handleBadgeChange(text) {
    text.length >= 4 ? this.setState({ validBadgeNumber: true }) : this.setState({ validBadgeNumber: false })
    this.setState({ username: text });
  }

  handlePasswordChange(text) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    text.match(strongRegex) ? this.setState({ validPassword: true }) : this.setState({ validPassword: false });
    this.setState({ password: text });
  }

  handleCloseNotification() {
    this.setState({ showErrorMessage: false });
  }

  onCreatePoliceAccount() {
    this.props.navigation.navigate("Register")
  }

  render() {
    const userType = this.props.userType;
    const { validEmail, validBadgeNumber, validPassword, showErrorMessage, errorMessage, resolutionMessage } = this.state
    const formValid = userType == 'civilian'
      ? validEmail && validPassword
      : validBadgeNumber && validPassword;
    const notificationMarginTop = showErrorMessage ? 10 : 0;

    return (
      <KeyboardAvoidingView
        style={{backgroundColor: colors.background, display: 'flex', flex: 1}}
        behavior="padding"
      >
        <ScrollView style= {baseStyles.wrapper}>
          <Text style={baseStyles.headerText}>
            {userType == 'civilian' ? "Log In" : "Log In to your Police Account"}
          </Text>
          {userType == 'civilian'
            ? <InputField
              labelText="Email"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              autoFocus
              autoCapitalize={"none"}
              iconName="envelope"
              showCheckmark={this.state.validEmail}
            />
            : <InputField
              labelText="Badge Number"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handleBadgeChange}
              autoFocus
              autoCapitalize={"none"}
              showCheckmark={this.state.validBadgeNumber}
            />
          }
          <InputField
            labelText="Password"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="password"
            customStyle={{ marginBottom: 30 }}
            onChangeText={this.handlePasswordChange}
            showCheckmark={this.state.validPassword}
            autoCapitalize={"none"}
          />
          {userType == 'police' ?
            <TouchableHighlight
              style={styles.createAccountButtonSyle}
              onPress={() => this.onCreatePoliceAccount()}
            >
              <Text style={styles.createAccountButtonText}>
                Create a New Police Officer Account
                  </Text>
            </TouchableHighlight>
            : null
          }
          <TouchableOpacity
            style={baseStyles.nextButtonStyle}
            title={"Sign In"}
            onPress={this.signIn}
            disabled={!formValid}
          >
            <Text style={
              Object.assign({},
                baseStyles.nextButtonText,
                { color: formValid ? colors.white : colors.secondaryText })}
            > Sign In </Text>
            <Icon
              name="angle-right"
              color={formValid ? colors.white : colors.secondaryText}
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>
        </ScrollView>
        <View style={[baseStyles.errorMessageWrapper, { marginTop: notificationMarginTop }]}>
            <Notification
              showNotification={showErrorMessage}
              handleCloseNotification={this.handleCloseNotification}
              type="Error:"
              firstLine= {errorMessage}
              secondLine= {resolutionMessage}
            />
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userType,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
