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
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser } from '../graphql/mutations'


class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username:'',
      formValid: true,
      email: '',
      phone: '',
      badgeNumber: '',
      password: '',
      given_name: '',
      family_name: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleFirstNameChange(text) {
    this.setState({ given_name: text });
  }
  handleLastNameChange(text) {
    this.setState({ family_name: text });
  }
  handleEmailChange(text) {
    this.setState({ email: text });
  }
  handlePhoneChange(text) {
    this.setState({ phone: text });
  }
  handleBadgeChange(text) {
    this.setState({ email: text + "@removeme.com"});
  }
  handleUsernameChange(text) {
    this.setState({ username: text });
  }
  handlePasswordChange(text) {
    this.setState({ password: text });
  }

  signUp = async () => {
    if (this.props.userType == "civilian") {
      const {
        username, password, email, given_name, family_name
      } = this.state
      try {
        let result = await Auth.signUp({ username, password, attributes: { email, given_name, family_name }})
        console.log('successful sign up..')
        console.log(JSON.stringify(result));
        let user = {
          id:result.userSub,
          profileImageKey:'',
          username,
          email,
          first_name:given_name,
          last_name:family_name
        };
        await API.graphql(graphqlOperation(createUser, {input: user}));
        this.props.setLoggedIn(true);
        this.props.setUser(user);
        
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
    const userType = this.props.userType;
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
            />
            {userType == "civilian"
            ?
              <InputField
                labelText="Email Address"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="email"
                customStyle={{ marginBottom: 15 }}
                onChangeText={this.handleEmailChange}
                autoFocus
                autoCapitalize={"none"}
                iconName="envelope"
              />
            :
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
              />
            }
            <InputField
              labelText= "Username"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handleUsernameChange}
              autoFocus
              autoCapitalize={"words"}
            />
            <InputField
              labelText= "Password"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{ marginBottom: 15 }}
              onChangeText={this.handlePasswordChange}
              autoFocus
              autoCapitalize={"words"}
            />
            <TouchableOpacity 
              style = {baseStyles.nextButtonSyle} 
              title = {"Sign Up"}
              onPress = {this.signUp}>
              <Text style= {baseStyles.nextButtonText}> Sign Up </Text>
              <Icon
              name="angle-right"
              color={colors.white}
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
