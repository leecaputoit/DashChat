import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/ProfilePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };

    this.onLogOutPress = this.onLogOutPress.bind(this);

  }

  onLogOutPress() {
    this.props.setLoggedIn(false)
    console.log(this.props)
  }

  render() {
    const { user } = this.state;

    return (
      <View style={styles.mainWrapper}>
        <TouchableOpacity
         style={styles.logOutButtonStyle}
         onPress = {this.onLogOutPress}>
            <Text style={styles.logOutTextStyle}>
             {"Log out"}
           </Text>
        </TouchableOpacity>
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
            <Text style={styles.vehiclesTitle}>
             {"Registered Vehicles"}
           </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile); 