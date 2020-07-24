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
import Notification from '../common-components/Notification';
import InputField from '../common-components/InputField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
// import transparentHeaderStyle from '../styles/navigation';
// import NavBarButton from '../components/buttons/NavBarButton';
//import Loader from '../components/Loader';


import Amplify from '@aws-amplify/core'
import { Auth } from 'aws-amplify';
//import awsconfig from '../../aws-exports';
//Amplify.configure(awsconfig);

class ForgotPassword extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: "",
  //   headerRight: () => <NavBarButton
  //     handleButtonPress={() => navigation.navigate('ForgotPassword')}
  //     location="right"
  //     color={colors.white}
  //     text="Forgot Password"
  //   />,
  //   headerLeft: () => <NavBarButton
  //     handleButtonPress={() => navigation.goBack()}
  //     location="left"
  //     icon={<Icon name="angle-left" color={colors.white} size={30} />}
  //   />,
  //   headerStyle: transparentHeaderStyle,
  //   headerTransparent: true,
  //   headerTintColor: colors.white,
  // });
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      badgeNumber: '',
      username: '',
      confirmationCode: '',
      validPassword: false,
      showErrorMessage: false,
      errorMessage: '',
      resolutionMessage: '',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    //this.handleConfirmationCode = this.handleConfirmationCode.bind(this)
  }


  handlePasswordChange(text) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    text.match(strongRegex) ? this.setState({validPassword: true}): this.setState({validPassword: false});
    this.setState({ password: text });
  }

  handleCodeChange(text) {
    this.setState({ confirmationCode: text });
  }


  handleSubmitButton() {
    console.log(this.props)
    const username = this.props.route.params.username;
    const {confirmationCode, password} = this.state
    Auth.forgotPasswordSubmit(username, confirmationCode, password)
      .then(() => {
        this.props.navigation.navigate('LogIn');
      })
      .catch((err) => {
        this.setState({showErrorMessage: true})
        if (err.code === 'CodeMismatchException') {
          this.setState({errorMessage: "Looks like the code you entered is incorrect"})
          this.setState({resolutionMessage: "Please try again"})
        } else if (err.code === 'ExpiredCodeException') {
          this.setState({errorMessage: "Sorry, this code has expired"})
          this.setState({resolutionMessage: "Please request a new one"})
        } else if (err.code === 'InvalidPasswordException') {
          this.setState({errorMessage: "Looks like the password entered is invalid"})
          this.setState({resolutionMessage: "Please try a stronger password"})
        } else if (err.code === 'UserNotConfirmedException') {
          this.setState({errorMessage: "Looks like we still need to verify your account"})
          this.setState({resolutionMessage: "Check your email for a message from us"})
        } else if (err.code === 'UserNotFoundException') {
          this.setState({errorMessage: "Looks like we couldn't find your account"})
          this.setState({resolutionMessage: "Please try a different email address"})
        } else {
          console.log(err);
          this.setState({errorMessage: "Looks like something went wrong"})
          this.setState({resolutionMessage: "Please try again"})
        }
      });
  }

  handleCloseNotification() {
    this.setState({ showErrorMessage: false });
  }

  render() {
    const userType = this.props.userType;
    const {validPassword, showErrorMessage, errorMessage, resolutionMessage} = this.state
    const notificationMarginTop = showErrorMessage ? 10 : 0;
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: colors.background }, baseStyles.wrapper]}
        behavior="padding"
      >
            <Text style={baseStyles.headerText}>
              Let's get your password reset
            </Text>
          <ScrollView>
          <Text style={styles.forgotPasswordSubheading}>
              We have emailed you a confirmation code, please enter it below
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
            <InputField
              labelText="Password"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark = {this.state.validPassword}
              autoCapitalize={"none"}
              iconName="key"
            />
            <Text style = {styles.passwordDescription}>
              {"Passwords must:\n\t- Be at least 8 characters\n\t- Contain both uppercase and \n\tlowercase letters\n\t- Include at least one special character\n\te.g., ! @ # ? ]"}
            </Text>
            <TouchableOpacity 
              style = {baseStyles.nextButtonStyle}
              title = {"Submit"}
              onPress = {this.handleSubmitButton}
              disabled = {!validPassword}
              >
              <Text style= {
                Object.assign({},
                  baseStyles.nextButtonText, 
                  {color: validPassword? colors.white : colors.secondaryText})}
                > Submit </Text>
              <Icon
              name="angle-right"
              color={validPassword? colors.white: colors.secondaryText}
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


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
