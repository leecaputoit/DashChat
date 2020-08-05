import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/CallHistory';
import { getUserByLicensePlateNumber } from '../Utility/ProximitySearch'

export default class LandingPage extends Component {

  // async getUser(){
  //   await getUserByLicensePlateNumber('123');
  // }

  componentDidMount(){
    // this.getUser();
  }
  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };
  }

  render() {
    const { user } = this.state;

    return (
        // Use a flat-list to display previous recordings
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor={colors.white} barStyle="light-content" />
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeText}>
            Searching will be available here
          </Text>
        </View>
      </View>
    );
  }
}