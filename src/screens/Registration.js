import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/CallHistory';

export default class LandingPage extends Component {

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
          Registration filler
          </Text>
        </View>
      </View>
    );
  }
}