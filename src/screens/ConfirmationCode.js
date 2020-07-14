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
      code: '',
      validCode: true,
    };

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    //this.handleConfirmationCode = this.handleConfirmationCode.bind(this)
  }


  // handleConfirmationCode = () => {
  //   const { emailAddress, confirmationCode } = this.state;
  //   this.setState({ emailAddress: emailAddress.toLowerCase() })
  //   Auth.confirmSignUp(emailAddress, confirmationCode, {})
  //     .then(() => {
  //       this.setState({ modalVisible: false });
  //       this.props.navigation.navigate('Profile')
  //     })
  //     .catch(err => console.log(err));
  // }

  // async SignIn() {
  //   const { logIn, navigation } = this.props;
  //   const { navigate } = navigation;
  //   const { emailAddress, password } = this.state;
  //   this.setState({ emailAddress: emailAddress.toLowerCase() })
  //   try {
  //     const user = await Auth.signIn(emailAddress, password);
  //     console.log(user)
  //     if (user.challengeName === 'SMS_MFA' ||
  //       user.challengeName === 'SOFTWARE_TOKEN_MFA') {
  //       // You need to get the code from the UI inputs
  //       // and then trigger the following function with a button click
  //       //const code = getCodeFromUserInput();
  //       // If MFA is enabled, sign-in should be confirmed with the confirmation code
  //       this.setState({ modalVisible: true })
  //     } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
  //       // const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
  //       // // You need to get the new password and required attributes from the UI inputs
  //       // // and then trigger the following function with a button click
  //       // // For example, the email and phone_number are required attributes
  //       // const {emailAddress, password} = getInfoFromUserInput();
  //       // const loggedUser = await Auth.completeNewPassword(
  //       //     emailAddress,              // the Cognito User Object
  //       //     newPassword,       // the new password
  //       //     // OPTIONAL, the required attributes
  //       //     {
  //       //         name
  //       //     }
  //       // );
  //     } else if (user.challengeName === 'MFA_SETUP') {
  //       // This happens when the MFA method is TOTP
  //       // The user needs to setup the TOTP before using it
  //       // More info please check the Enabling MFA part
  //       Auth.setupTOTP(user);
  //     }
  //     else {
  //       //Auth.resendSignUp(emailAddress);
  //       this.setState({ formValid: true, loadingVisible: false });
  //       this.props.navigation.navigate('Profile');
  //       // The user directly signs in
  //       console.log(user);

  //     }
  //   } catch (err) {
  //     console.log(err)
  //     if (err.code === 'UserNotConfirmedException') {
  //       // The error happens if the user didn't finish the confirmation step when signing up
  //       // In this case you need to resend the code and confirm the user
  //       // About how to resend the code and confirm the user, please check the signUp part
  //       this.setState({ modalVisible: true });
  //       this.setState({ formValid: false, loadingVisible: false });
  //     } else if (err.code === 'PasswordResetRequiredException') {
  //       // The error happens when the password is reset in the Cognito console
  //       // In this case you need to call forgotPassword to reset the password
  //       // Please check the Forgot Password part.
  //       Auth.forgotPassword(emailAddress);
  //       this.props.navigation.navigate('ForgotPassword');
  //     } else if (err.code === 'NotAuthorizedException') {
  //       // The error happens when the incorrect password is provided
  //       this.setState({ formValid: false, loadingVisible: false });
  //     } else if (err.code === 'UserNotFoundException') {
  //       // The error happens when the supplied username/email does not exist in the Cognito user pool
  //       this.setState({ formValid: false, loadingVisible: false });
  //     } else {
  //       this.setState({ formValid: false, loadingVisible: false });
  //       console.log(err);
  //     }
  //   }
  // }

  handleSignInButton() {
    //this.setState({ loadingVisible: true });
    // const { logIn, navigation } = this.props;

    // this.SignIn();
    // setTimeout(() => {
    //   const { emailAddress, password } = this.state;
    //   this.setState({ emailAddress: emailAddress.toLowerCase() })
    //   this.SignIn
    // }, 2000);
    this.props.setLoggedIn(true)
  }


  handleCodeChange(text) {
    this.setState({ code: text });
  }


  handleNextButton() {
    this.props.setUserType('police')
  }

  render() {
    const userType = this.props.userType;
    const {validCode} = this.state
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: colors.background }, baseStyles.wrapper]}
        behavior="padding"
      >
            <Text style={baseStyles.headerText}>
              Let's make sure this is really you
            </Text>
          <ScrollView>
          <Text style={styles.forgotPasswordSubheading}>
              You have been texted or emailed a confirmation code, please enter it below
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
              style = {baseStyles.nextButtonSyle}
              title = {"Submit"}
              onPress = {this.signIn}
              disabled = {!validCode}
              >
              <Text style= {
                Object.assign({},
                  baseStyles.nextButtonText, 
                  {color: validCode? colors.white : colors.secondaryText})}
                > Finish </Text>
              <Icon
              name="angle-right"
              color={validCode? colors.white: colors.secondaryText}
              size={22}
              style={styles.icon}
              />
            </TouchableOpacity>
          </ScrollView>
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
