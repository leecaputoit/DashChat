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


class Registration extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      email: '',
      phone: '',
      badgeNumber: '',
      password: '',
      firstName: '',
      lastName: '',
    };

    this.state = { user: null, customState: null };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
  }

  handleFirstNameChange(text) {
    this.setState({ firstName: text });
  }
  handleLastNameChange(text) {
    this.setState({ lastName: text });
  }
  handleEmailChange(text) {
    this.setState({ email: text });
  }
  handlePhoneChange(text) {
    this.setState({ phone: text });
  }
  handleBadgeChange(text) {
    this.setState({ badgeNumber: text });
  }
  handlePasswordChange(text) {
    this.setState({ password: text });
  }
  handleNextButton() {
    console.log(this.props);
    this.props.setLoggedIn(true)
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
              customStyle={{ marginBottom: 30 }}
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
              customStyle={{ marginBottom: 30 }}
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
                customStyle={{ marginBottom: 30 }}
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
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handleBadgeChange}
                autoFocus
                autoCapitalize={"none"}
                iconName="envelope"
              />
            }
            <InputField
              labelText= "Password"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              autoFocus
              autoCapitalize={"words"}
            />
            <TouchableOpacity 
              style = {baseStyles.nextButtonSyle} 
              title = {"Next"} 
              onPress = {this.handleNextButton}>
              <Text style= {baseStyles.nextButtonText}> Next </Text>
              <Icon
              name="angle-right"
              color={colors.white}
              size={32}
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
