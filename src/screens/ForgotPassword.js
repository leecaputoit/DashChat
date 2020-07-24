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
import Notification from '../common-components/Notification';
import styles from './styles/ForgotPassword';
import InputField from '../common-components/InputField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import Amplify from '@aws-amplify/core'
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
      validUsername: false,
      validBadgenumber: false,
      showErrorMessage: false,
      errorMessage: '',
      resolutionMessage: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.onPoliceButton = this.onPoliceButton.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleEmailChange(text) {
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ emailAddress: text });
    this.setState({ username: text });
    text.match(emailformat) ? this.setState({ validEmail: true }) : this.setState({ validEmail: false });
  }
  handleBadgeChange(text) {
    text.length >= 4 ? this.setState({ validBadgenumber: true }) : this.setState({ validBadgenumber: false })
    this.setState({ badgeNumber: text });
  }
  onPoliceButton() {
    this.props.setUserType('police')
  }
  handleCloseNotification() {
    this.setState({ showErrorMessage: false });
  }
  handleNextButton() {
    const { emailAddress, badgeNumber } = this.state
    const userName = this.props.userType == 'civilian' ? emailAddress : badgeNumber
    setTimeout(async () => {
      try {
        await Auth.forgotPassword(userName)
        this.props.navigation.navigate(
          'NewPassword',
          { username: userName }
        )
      }
      catch (err) {
        this.setState({ showErrorMessage: true })
        if (err.code === 'UserNotConfirmedException') {
          this.setState({errorMessage: "Looks like we still need to verify your account"})
          this.setState({resolutionMessage: "Check your email for a message from us"})
        } else if (err.code === 'UserNotFoundException') {
          this.setState({errorMessage: "Looks like we couldn't find your account"})
          this.setState({resolutionMessage: "Please try a different email address"})
        } else {
          console.log(err);
          this.setState({ errorMessage: "Looks like something went wrong" })
          this.setState({ resolutionMessage: "Please try again" })
        }
      }
    }, 2000);
  }

  render() {
    console.log(this.props)
    const userType = this.props.userType;
    const { validEmail, validBadgenumber, showErrorMessage, errorMessage, resolutionMessage } = this.state
    const formValid = userType == 'civilian' ? validEmail : validBadgenumber
    const notificationMarginTop = showErrorMessage ? 10 : 0;
    return (
      <KeyboardAvoidingView
        style={{ backgroundColor: colors.background, display: 'flex', flex: 1 }}
        behavior="padding"
      >
        <ScrollView style={baseStyles.wrapper}>
          <Text style={baseStyles.headerText}>
            Forgot your password?
            </Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your {userType == 'civilian' ? "email" : "badge number"} below to reset your password.
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
              inputType="number"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleBadgeChange}
              showCheckmark={this.state.validBadgenumber}
              autoFocus
              autoCapitalize={"none"}
              iconName="envelope"
            />
          }
          <TouchableOpacity
            style={baseStyles.nextButtonStyle}
            title={"Sign In"}
            onPress={this.handleNextButton}
            disabled={!formValid}
          >
            <Text style={
              Object.assign({},
                baseStyles.nextButtonText,
                { color: formValid ? colors.white : colors.secondaryText })}
            > Next </Text>
            <Icon
              name="angle-right"
              color={formValid ? colors.white : colors.secondaryText}
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableHighlight
            style={styles.policeLoginButton}
            onPress={() => this.onPoliceButton()}
          >
            <Text style={styles.policeLoginButtonText}>
              Police Officer?
            </Text>
          </TouchableHighlight>
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
