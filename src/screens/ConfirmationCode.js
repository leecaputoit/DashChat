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
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import styles from './styles/ForgotPassword';
import InputField from '../common-components/InputField';
import Notification from '../common-components/Notification';
import { getUser } from '../graphql/queries'
import { createUser } from '../graphql/mutations'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {initLocationTracking} from '../Utility/ProximitySearch'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      badgeNumber: '',
      username: '',
      confirmationCode: '',
      validCode: true,
      showErrorMessage: false,
      errorMessage: '',
      resolutionMessage: '',
      refresh:''
    };

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleConfirmationCode = this.handleConfirmationCode.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.signIn = this.signIn.bind(this);
  }


  handleConfirmationCode = async () => {
    const { confirmationCode } = this.state;
    const username = this.props.route.params.username;
    const password = this.props.route.params.password;
    await Auth.confirmSignUp(username, confirmationCode, {})
      .then(async () => {
        await this.signIn(username, password);
      })
      .catch((err) => {
        this.setState({ showErrorMessage: true })
        console.log(err)
        if (err.code === 'CodeMismatchException') {
          this.setState({ errorMessage: "Looks like the code you entered is incorrect" })
          this.setState({ resolutionMessage: "Please try again" })
        } else if (err.code === 'ExpiredCodeException') {
          this.setState({ errorMessage: "Sorry, this code has expired" })
          this.setState({ resolutionMessage: "Please request a new one" })
        } else if (err.code === 'InvalidPasswordException') {
          this.setState({ errorMessage: "Looks like the password entered is invalid" })
          this.setState({ resolutionMessage: "Please try a stronger password" })
        } else if (err.code === 'UserNotConfirmedException') {
          this.setState({ errorMessage: "Looks like we still need to verify your account" })
          this.setState({ resolutionMessage: "Check your email for a message from us" })
        } else {
          this.setState({ errorMessage: "Looks like something went wrong" })
          this.setState({ resolutionMessage: "Please try again" })
        }
      });
  }

  signIn = async (username, password) => {
    try {
      const userFromAuth = await Auth.signIn({ username, password })
      console.log('successful signed in..')
      

      //Grab userobject from dynamo
      const result = await API.graphql(graphqlOperation(getUser, {id:userFromAuth.signInUserSession.idToken.payload.sub}));
      let user = result.data.getUser;

      //if userobject was not found
      if(!user){
         //establish user object to be saved to dynamo
         let awsCreds = await Auth.currentCredentials();
        let userObject = {
          id:userFromAuth.signInUserSession.idToken.payload.sub,
          username:this.state.username,
          first_name:userFromAuth.signInUserSession.idToken.payload.given_name,
          last_name:userFromAuth.signInUserSession.idToken.payload.family_name, 
          awsIdentityId: awsCreds.identityId
        };
        //access dynamo through graphql
        await API.graphql(graphqlOperation(createUser, {input: userObject}));
        this.props.setUser(userObject);
        //start location tracking
        await initLocationTracking();
        //force re-render the page so that the location tracking service notices ->
        //that the app is in the foreground, otherwise the service starts by ->
        //default in the background mode while the app is actually active and in the foreground ->
        //which causes irregular update behavior that prevents syncing location to the backend
        this.setState({refresh:''});
        if (this.props.userType == "civilian") {
          this.props.navigation.navigate("DocumentUpload");
        }
        else {
          this.props.setLoggedIn(true);
        }
        return;
      }

      //if user object already exists
      console.log(user)
      this.props.setUser(user);
      this.props.setLoggedIn(true);
    }
    catch(err) {
      console.log(err);
      this.setState({errorMessage: "Looks like something went wrong"})
      this.setState({resolutionMessage: "Please try again"})
    }
  }

  handleCodeChange(text) {
    this.setState({ confirmationCode: text });
  }
  handleCloseNotification() {
    this.setState({ showErrorMessage: false });
  }

  handleNextButton() {
    this.props.setUserType('police')
  }

  render() {
    const userType = this.props.userType;
    const { validCode, showErrorMessage, errorMessage, resolutionMessage } = this.state
    const notificationMarginTop = showErrorMessage ? 10 : 0;
    return (
      <KeyboardAvoidingView
        style={{
          backgroundColor: colors.background, display: 'flex', flex: 1
        }}
        behavior="padding"
      >
        <ScrollView style={baseStyles.wrapper}>
        <Text style={baseStyles.headerText}>
          Let's confirm that this is really you.
            </Text>
          <Text style={styles.forgotPasswordSubheading}>
            You have been emailed a confirmation code, please enter it below
            </Text>
          <InputField
            labelText="Confirmation Code"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="text"
            customStyle={{ marginBottom: 30 }}
            onChangeText={this.handleCodeChange}
            autoCapitalize={"none"}
            iconName="key"
          />
          <TouchableOpacity
            style={baseStyles.nextButtonStyle}
            title={"Submit"}
            onPress={this.handleConfirmationCode}
            disabled={!validCode}
          >
            <Text style={
              Object.assign({},
                baseStyles.nextButtonText,
                { color: validCode ? colors.white : colors.secondaryText })}
            > Submit </Text>
            <Icon
              name="angle-right"
              color={validCode ? colors.white : colors.secondaryText}
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
            firstLine={errorMessage}
            secondLine={resolutionMessage}
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


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
