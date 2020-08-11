import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, TouchableOpacity, Platform, TextInput } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import requestCameraAndAudioPermission from './Permission';
import { PlatformColor } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/Calls'

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null, 
      customState: null, 
      AppID: 'ea0b715536634dff9a08f603983f7d18', 
      ChannelName: '' 
    };
    if(Platform.OS === 'android') {
      requestCameraAndAudioPermission.apply().then(_ => {
        console.log('request made');
      });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <View style={baseStyles.wrapper}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
        <Text style={baseStyles.headerText}>
            Incoming calls will be available here. To accept a call, click the "Accept" button when it appears.
          </Text>
      </View>
    );
  }
}