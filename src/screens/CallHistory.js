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
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
        <View style={styles.welcomeWrapper}>
          <Text style={styles.callHistoryText}>Call History</Text>
          <Text style={styles.dateText}>June 9, 2020</Text>
          <Text style={styles.dateTwoText}>March 7, 2018</Text>
          <Text style={styles.dateThreeText}>May 12, 2016</Text>

          <Text style={styles.officerOneText}>Offc. Darryl Booth</Text>
          <Text style={styles.officerTwoText}>Offc. Alyssa Jones</Text>
          <Text style={styles.officerThreeText}>Offc. Jean Sanders</Text>

          <View style={styles.videoRec}></View>
          <View style={styles.videoRec2}></View>
          <View style={styles.videoRec3}></View>

          <View style={styles.borderLine}></View>
          <View style={styles.borderLine2}></View>

          <Icon name="file-archive-o" style={styles.docsIcon}></Icon>
          <Icon name="file-archive-o" style={styles.docsIcon2}></Icon>
          <Icon name="file-archive-o" style={styles.docsIcon3}></Icon>

          <Icon name="play-circle-o" style={styles.playIcon}></Icon>
          <Icon name="play-circle-o" style={styles.playIcon2}></Icon>
        </View>
      </View>
      
    );
  }
}