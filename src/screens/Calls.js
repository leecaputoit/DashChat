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

  handleSubmit = () => {
    let AppID = this.state.AppID;
    let ChannelName = this.state.ChannelName;
    if (AppID !== '' && ChannelName !== '') {
      Actions.videoTest({AppID, ChannelName});
    }
  }

  render() {
    const { user } = this.state;

    return (
        // Use a flat-list to display previous recordings
      <View style={baseStyles.wrapper}>
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
          {/* <Text style={baseStyles.headerText}>
            Incoming Calls will become available here 
          </Text> */}
          <View style={styles.container}>
        <Text style={styles.formLabel}>App ID</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={AppID => this.setState({AppID})}
          value={this.state.AppID}
        />
        <Text style={styles.formLabel}>Channel Name</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={ChannelName => this.setState({ChannelName})}
          value={this.state.ChannelName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Start Call!"
            onPress={this.handleSubmit}
            style={styles.submitButton}>
            <Text style={styles.white}> Start Call </Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
    );
  }
}