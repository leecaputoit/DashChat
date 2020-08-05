import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import requestCameraAndAudioPermission from './Permission';
import { PlatformColor } from 'react-native';
import { Actions } from 'react-native-router-flux'
import styles from '../screens/styles/Calls'
import Video from './Video'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//export default class LandingPage extends Component {
class MakeCalls extends React.Component {

  constructor(props) {
    super(props);
    console.log("Props: " + JSON.stringify(props));
    this.state = { 
      AppID: 'ea0b715536634dff9a08f603983f7d18', 
      ChannelName: '' 
    };
    if(Platform.OS === 'android') {
      requestCameraAndAudioPermission.apply().then(_ => {
        console.log('request made');
      });
    }
  }
  
  handleSubmit = ({ navigation }) => {
    let AppID = this.state.AppID;
    console.log("AppID: " + AppID);
    let ChannelName = this.state.ChannelName;
    console.log("This.state " + JSON.stringify(this.state));
    if (AppID !== '' && ChannelName !== '') {
      //Actions.video({AppID, ChannelName});
      console.log("Button pressed");
      //Video({AppID, ChannelName});
      return (
        navigation.navigate('Videos', {appid: AppID, channelName: ChannelName})
        )
      }
    }


    render() {
        return (
            <View style={baseStyles.wrapper}>
            <StatusBar backgroundColor={colors.black} barStyle="light-content" />
            {/* <Text style={baseStyles.headerText}>
                Incoming Calls will become available here 
            </Text> */}
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
            {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
                title="Start Call!"
                onPress={this.handleSubmit}
                style={styles.submitButton}>
                <Text style={styles.white}> Start Call </Text>
            </TouchableOpacity>
            </View> */}
        </View>
        )
    }
}

export default MakeCalls;