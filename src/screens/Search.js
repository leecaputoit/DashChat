import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/CallHistory';
import { getUserByLicensePlateNumber } from '../Utility/ProximitySearch'
import { ProfileContainer } from '../common-components/ProfileContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { StatusBar, Text, View, TouchableHighlight, TouchableOpacity, Platform, TextInput } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';
import requestCameraAndAudioPermission from './Permission';
import { PlatformColor } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles/Calls'

const style = StyleSheet.create({
  view: {
    marginBottom: 200
  }
});

class Search extends Component {

  // async getUser(){
  //   await getUserByLicensePlateNumber('123');
  // }

  componentDidMount() {
    // this.getUser();
  }
  constructor(props) {
    super(props);


    export default class LandingPage extends Component {
      constructor(props) {
        super(props);
        this.state = { user: null, customState: null, AppID: 'ea0b715536634dff9a08f603983f7d18', ChannelName: 'CEN3031' };
        this.handleSubmit = this.handleSubmit.bind(this);
        if (Platform.OS === 'android') {
          requestCameraAndAudioPermission.apply().then(_ => {
            console.log('request made');
          });
        }
      }

      handleSubmit = () => {
        let AppID = this.state.AppID;
        let ChannelName = this.state.ChannelName;
        if (AppID !== '' && ChannelName !== '') {
          Actions.videoCall({ AppID, ChannelName });
        }
      }

      render() {

        return (
          // Use a flat-list to display previous recordings
          <View style={styles.mainWrapper}>
            <StatusBar backgroundColor={colors.white} barStyle="light-content" />
            <View style={styles.welcomeWrapper}>
              <Text style={styles.welcomeText}>
              </Text>
              <View style={style.view}>

              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  title="Start Call!"
                  onPress={this.handleSubmit}
                  style={styles.buttonStyles}>
                  <Text style={styles.black}> Start Test Call </Text>
                </TouchableOpacity>
              </View>
              <ProfileContainer userInfo={this.props.user} searchParameter={'1'} />

            </View>
          </View>
        );
      }
    }

    const mapStateToProps = state => {
      return {
        user: state.user,
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return bindActionCreators(ActionCreators, dispatch);
    };


    export default connect(mapStateToProps, mapDispatchToProps)(Search); 