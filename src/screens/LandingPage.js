import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import RoundedButton from '../common-components/Buttons/RoundedButton';
import styles from './styles/LandingPage';

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };


    this.onCreateAccountPress = this.onCreateAccountPress.bind(this);
    this.onFacebookPress = this.onFacebookPress.bind(this);
    this.onGooglePress = this.onGooglePress.bind(this);
    this.onApplePress = this.onApplePress.bind(this);
    this.loginPress = this.onLoginPress.bind(this);
  }

  async onFacebookPress() {
  }

  onGooglePress() {
  }

  onApplePress() { }

  onCreateAccountPress() {
    this.props.navigation.navigate('Register');
  }

  onLoginPress() {
  }

  render() {
    const { user } = this.state;

    return (
      <ScrollView style={styles.wrapper}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
        <View style={styles.welcomeWrapper}>
          {/* <Image
            source={Logo}
            style={styles.logo}
          /> */}
          <Text style={styles.welcomeText}>
            Welcome to AppName.
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
            style={styles.loginButton}
            onPress={this.onLoginPress}
          >
            <Text style={styles.loginButtonText}>
              Already have an Account?
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}