import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/ProfilePage';

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };
  }

  render() {
    const { user } = this.state;

    return (
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        <View style={styles.imageContainer}>
          <Image 
           style={styles.imageStyles}
          source={require("../img/exampleCivilian.jpg")}
          />
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.nameStyles}>
            {"Jillian Grey"}
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyles}>
            <Text style={styles.textStyles}>
              {"Driver's License"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles}>
            <Text style={styles.textStyles}>
             {"Vehicle Registrations"}
           </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}