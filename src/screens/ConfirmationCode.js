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
import { Auth } from 'aws-amplify';

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
    };

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleConfirmationCode = this.handleConfirmationCode.bind(this)
  }


  handleConfirmationCode = async () => {
    const { confirmationCode } = this.state;
    const user = this.props.route.params.user;
    emailAddress = emailAddress.toLowerCase()
    Auth.confirmSignUp(user.username, confirmationCode, {})
      .then(() => {
        this.props.setLoggedIn(true);
      })
      .catch(err => console.log(err));
      
    // If MFA is enabled, sign-in should be confirmed with the confirmation code
    const loggedUser = await Auth.confirmSignIn(
      user,   // Return object from Auth.signIn()
      confirmationCode,   // Confirmation code  
      mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    );
  }

  handleCodeChange(text) {
    this.setState({ confirmationCode: text });
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
              Let's confirm that this is really you.
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
              style = {baseStyles.nextButtonStyle}
              title = {"Submit"}
              onPress = {this.handleConfirmationCode}
              disabled = {!validCode}
              >
              <Text style= {
                Object.assign({},
                  baseStyles.nextButtonText, 
                  {color: validCode? colors.white : colors.secondaryText})}
                > Submit </Text>
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
