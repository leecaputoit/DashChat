import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import RoundedButton from '../common-components/RoundedButton';
import baseStyles from './styles/AuthenticationBoilerplate';
import styles from './styles/LandingPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { Auth } from 'aws-amplify';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };


    this.onCreateAccountPress = this.onCreateAccountPress.bind(this);
    this.onFacebookPress = this.onFacebookPress.bind(this);
    this.onGooglePress = this.onGooglePress.bind(this);
    this.onApplePress = this.onApplePress.bind(this);
    this.logInPress = this.onLoginPress.bind(this);
  }

  async onFacebookPress() {
    Auth.federatedSignIn({ provider: "Facebook" });
  }

  onGooglePress() {
    Auth.federatedSignIn({ provider: "Google" });
  }

  onApplePress() { }

  onCreateAccountPress() {
    this.props.setUserType('civilian')
    this.props.navigation.navigate('Register');
  }

  onLoginPress() {
    this.props.setUserType('civilian')
    this.props.navigation.navigate('LogIn');
  }

  onPoliceLoginPress() {
    this.props.setUserType('police')
    this.props.navigation.navigate('LogIn');
  }


  render() {
    const { user } = this.state;

    return (
      <ScrollView style={baseStyles.wrapper}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
          {/* <Image
            source={Logo}
            style={styles.logo}
          /> */}
          <Text style={baseStyles.headerText}>
            Welcome to DashChat.
          </Text>
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.white}
            background={colors.fbBlue}
            borderColor = {colors.fbBlue}
            icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onFacebookPress}
          />
          <RoundedButton
            text="Continue with Google"
            textColor={colors.white}
            background={colors.google}
            borderColor = {colors.google}
            icon={<Icon name="google" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onGooglePress}
          />
          <RoundedButton
            text="Continue with Apple"
            textColor={colors.black}
            background={colors.white}
            icon={<Icon name="apple" size={20} style={styles.appleButtonIcon} />}
            handleOnPress={this.onApplePress}
          />
          <RoundedButton
            text="Create an Account"
            textColor={colors.black}
            background={colors.white}
            icon={<Icon name="envelope" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onCreateAccountPress}
          />
          <TouchableHighlight
            style={baseStyles.nextButtonStyle}
            onPress= {() => this.onLoginPress()}
          >
            <Text style={baseStyles.nextButtonText}>
              Log In  <Icon
              name="angle-right"
              color={colors.white}
              size={18}
              style={styles.icon}
              />
            </Text>
            
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.policeLoginButton}
            onPress= {() => this.onPoliceLoginPress()}
          >
            <Text style={styles.policeLoginButtonText}>
              Police Officer?
            </Text>
          </TouchableHighlight>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};



export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);