import React, { Component } from 'react';
import { Button, StatusBar, Image, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../common-components/RoundedButton';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/platform';
import styles from './styles/Registration';
import baseStyles from './styles/AuthenticationBoilerplate';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { Item, Form, Label, Input, Container, Text, View, StyleProvider } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connectStyle } from 'native-base';
import InputField from '../common-components/InputField'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { Auth } from 'aws-amplify';
import { color } from 'react-native-reanimated';


class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      email: '',
      phone: '',
      badgeNumber: '',
      password: '',
      given_name: '',
      family_name: '',
      validFirstName: false,
      validLastName: false,
      validBadgeNumber: false,
      validEmail: false,
      validPassword: false,
    };

    this.state = { user: null, customState: null };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleFirstNameChange(text) {
    text.length>=3 ? this.setState({validFirstName: true}) : this.setState({validFirstName: false})
    this.setState({ given_name: text });
  }
  handleLastNameChange(text) {
    text.length>=3 ? this.setState({validLastName: true}) : this.setState({validLastName: false})
    this.setState({ family_name: text });
  }
  handleEmailChange(text) {
    var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ email: text })
    this.setState({ username: text });
    text.match(emailformat) ? this.setState({validEmail: true}): this.setState({validEmail: false});
  }
  handlePhoneChange(text) {
    this.setState({ phone: text });
  }
  handleBadgeChange(text) {
    text.length>=4 ? this.setState({validBadgeNumber: true}) : this.setState({validBadgeNumber: false})
    this.setState({ username: text });
  }
  handleUsernameChange(text) {
    this.setState({ username: text });
  }
  handlePasswordChange(text) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.setState({ password: text });
    text.match(strongRegex) ? this.setState({validPassword: true}): this.setState({validPassword: false});
    console.log(this.state)
  }

  signUp = async () => {
    if (this.props.userType == "civilian") {
      const {
        username, password, email, given_name, family_name
      } = this.state
      try {
        await Auth.signUp({ username, password, attributes: { email, given_name, family_name }})
        console.log('successful sign up..')
        console.log(this.props)
        this.props.setLoggedIn(true)
      } catch (err) {
        console.log('error signing up...', err)
      }
    }
    else if (this.props.userType == "police") {
      const {
        username, password, given_name, family_name, email
      } = this.state
      try {
        await Auth.signUp({ username, password, attributes: { given_name, family_name, email }})
        console.log('successful sign up..')
        console.log(this.props)
        this.props.setLoggedIn(true)
      } catch (err) {
        console.log('error signing up...', err)
      }
    }
  }

  render() {
    const {validEmail, validFirstName, validLastName, validBadgeNumber, validPassword} = this.state;
    const userType = this.props.userType;
    const formValid = userType == 'civilian' 
                      ? (validEmail && validFirstName && validLastName && validPassword)
                      : (validBadgeNumber && validFirstName && validLastName && validPassword)
    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: colors.background }, baseStyles.wrapper]}
        behavior="padding"
      >
        <ScrollView>
          <Text style={baseStyles.headerText}>
            Join DashChat.
          </Text>
          <InputField
              labelText="First Name"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handleFirstNameChange}
              autoFocus
              autoCapitalize={"words"}
              showCheckmark={this.state.validFirstName}
            />
            <InputField
              labelText="Last Name"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handleLastNameChange}
              autoFocus
              autoCapitalize={"words"}
              showCheckmark={this.state.validLastName}
            />
            <InputField
              labelText="Email Address"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              showCheckmark={this.state.validEmail}
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handleEmailChange}
              validEmail = {this.state.validEmail}
              autoFocus
              autoCapitalize={"none"}
              iconName="envelope"
            />
            {userType == "police"
            ?
              <InputField
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
                iconName="envelope"
                showCheckmark={this.state.validBadgeNumber}
              /> : null
            }
            <InputField
              labelText= "Password"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              iconPosition = "left"
              borderBottomColor={colors.white}
              inputType="text"
              showCheckmark={this.state.validPassword}
              validPassword = {this.state.validPassword}
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handlePasswordChange}
              autoFocus
              autoCapitalize={"words"}
            />
            <Text style = {styles.passwordDescription}>
              {"Passwords must:\n\t- Be at least 8 characters\n\t- Contain both uppercase and \n\tlowercase letters\n\t- Include at least one special character\n\te.g., ! @ # ? ]"}
            </Text>
            <TouchableOpacity 
              style = {baseStyles.nextButtonStyle}
              title = {"Sign Up"}
              onPress = {this.signUp}
              disabled = {!formValid}
              >
              <Text style= {
                Object.assign({},
                  baseStyles.nextButtonText, 
                  {color: formValid? colors.white : colors.secondaryText})}
                > Sign Up </Text>
              <Icon
              name="angle-right"
              color={formValid? colors.white: colors.secondaryText}
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


export default connect(mapStateToProps, mapDispatchToProps)(Registration);
