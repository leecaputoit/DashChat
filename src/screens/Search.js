import React, { Component } from 'react';
import { KeyboardAvoidingView, StatusBar, Text, View, TouchableHighlight, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/CallHistory';
import { getUserByLicensePlateNumber } from '../Utility/ProximitySearch'
import { ProfileContainer } from '../common-components/ProfileContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import baseStyles from './styles/AuthenticationBoilerplate';
import requestCameraAndAudioPermission from './Permission';
import { PlatformColor } from 'react-native';
import { Actions } from 'react-native-router-flux';
import callStyles from './styles/Calls'
import InputField from '../common-components/InputField'

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
      <KeyboardAvoidingView
        style={{ backgroundColor: colors.background, display: 'flex', flex: 1 }}
        behavior="padding"
      >
        <ScrollView style={baseStyles.wrapper}>
          <Text style={styles.headerText}>License Plate Search</Text>
          <InputField
            labelText=""
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="email"
            customStyle={{ marginTop: 0, marginBottom: 0 }}
            onChangeText={this.updateSearch}
            showCheckmark={false}
            autoCapitalize={"none"}
            iconName="search"
          />
          <Text style={styles.welcomeText}>
            Search
          </Text>
          <View style={callStyles.buttonContainer} >
            <TouchableOpacity
              title="Start Call!"
              onPress={this.handleSubmit}
              style={callStyles.buttonStyles}>
              <Text style={callStyles.black}> Start Call </Text>
            </TouchableOpacity>
          </View>
          <ProfileContainer userInfo={this.props.user} searchParameter={'1'} />
        </ScrollView>
      </KeyboardAvoidingView>
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


