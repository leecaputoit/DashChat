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
      confirmationCode: '',
      validUsername: false,
      validBadgenumber: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.onPoliceButton = this.onPoliceButton.bind(this);
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


  handleEmailChange(text) {
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ emailAddress: text });
    this.setState({ username: text });
    text.match(emailformat) ? this.setState({validEmail: true}): this.setState({validEmail: false});
  }


  handleBadgeChange(text) {
    text.length>=4 ? this.setState({validBadgenumber: true}) : this.setState({validBadgenumber: false})
    this.setState({ badgeNumber: text });
  }

  onPoliceButton() {
    this.props.setUserType('police')
  }

  handleNextButton() {
    this.props.navigation.navigate(
        'NewPassword',
        {
          username: 'bryan.marin1026@gmail.com'
        }
  )
    // const { emailAddress } = this.state
    // setTimeout(() => {
    //   Auth.forgotPassword(emailAddress)
    //     .then(
    //       this.props.navigation.navigate('NewPassword',
    //       {
    //         username: emailAddress
    //       })
    //     )
    //     .catch( () => {
    //       console.log("user not found");
    //     });
    // }, 2000);
  }

  render() {
    const userType = this.props.userType;
    const {validEmail, validBadgenumber} = this.state
    const formValid = userType == 'civilian' ? validEmail : validBadgenumber
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: colors.background }, baseStyles.wrapper]}
        behavior="padding"
      >
          <ScrollView>
            <Text style={baseStyles.headerText}>
              Forgot your password?
            </Text>
            <Text style={styles.forgotPasswordSubheading}>
              Enter your {userType == 'civilian' ? "email" : "badge number"} below to reset your password.
                </Text>
            { userType == 'civilian'
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
                showCheckmark = {this.state.validEmail}
              />
            : <InputField
                labelText="Badge Number"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="number"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handleBadgeChange}
                showCheckmark = {this.state.validBadgenumber}
                autoFocus
                autoCapitalize={"none"}
                iconName="envelope"
              />
            }
            <TouchableOpacity 
              style = {baseStyles.nextButtonStyle}
              title = {"Sign In"}
              onPress = {this.handleNextButton}
              disabled = {false}
              >
              <Text style= {
                Object.assign({},
                  baseStyles.nextButtonText, 
                  {color: formValid? colors.white : colors.secondaryText})}
                > Next </Text>
              <Icon
              name="angle-right"
              color={formValid? colors.white: colors.secondaryText}
              size={22}
              style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableHighlight
            style={styles.policeLoginButton}
            onPress= {() => this.onPoliceButton()}
          >
            <Text style={styles.policeLoginButtonText}>
              Police Officer?
            </Text>
          </TouchableHighlight>
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
