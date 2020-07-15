import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import baseStyles from './styles/AuthenticationBoilerplate';

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };
  }

  render() {
    const { user } = this.state;

    return (
        // Use a flat-list to display previous recordings
      <View style={baseStyles.wrapper}>
        <StatusBar backgroundColor={colors.white} barStyle="light-content" />
          <Text style={baseStyles.headerText}>
            Incoming Calls will become available here
          </Text>
      </View>
    );
  }
}