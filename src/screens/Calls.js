import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView, Platform } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import requestCameraAndAudioPermission from './Permission';
import { PlatformColor } from 'react-native';

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
      // requestCameraAndAudioPermission.apply().then(_ => {
      //   console.log('request made');
      // });
    }
  }

  handleSubmit = () => {
    let AppID = this.state.AppID;
    let ChannelName = this.state.ChannelName;
    if (AppID !== '' && ChannelName !== '') {
      
    }
  }

  render() {
    const { user } = this.state;

    return (
        // Use a flat-list to display previous recordings
      <View style={baseStyles.wrapper}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
          <Text style={baseStyles.headerText}>
            Incoming Calls will become available here 
          </Text>
      </View>
    );
  }
}