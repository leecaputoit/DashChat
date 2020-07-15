import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, ImageStore } from 'react-native';
import colors from '../styles/colors';
import styles from './styles/ProfilePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import ImageSelector from '../common-components/ImageSelector'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { uploadToStorage, readFromStorage } from '../Utility/FileStorageAPI'

import Amplify from '@aws-amplify/core'
import { Auth } from 'aws-amplify';
class Profile extends Component {


  constructor(props) {
    super(props);

    this.onLogOutPress = this.onLogOutPress.bind(this);
  }
  async initalizeProfileImage(){
    await this.props.setProfileImageThunk();
  }

  componentDidMount(){
    this.initalizeProfileImage();
  }

  
  onLogOutPress() {
    Auth.signOut({ global: true })
    this.props.setLoggedIn(false)
  }


  render() {
    let imageSource;
    if(this.props.profileImageURI.length === 0){
      imageSource = require('../img/noProfileImageFound.jpg');
    }else{
      imageSource = {uri: this.props.profileImageURI}
    }
    
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
            source={
              imageSource
              }
          />
          <ImageSelector style={styles.imagePicker} handleResult={uploadToStorage}/>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.nameStyles}>
            { this.props.user.first_name + ' ' +  this.props.user.last_name }
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.props.setProfileImageThunk} style={styles.buttonStyles}>
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

const mapStateToProps = state => {
  return {
    user: state.user,
    profileImageURI: state.profileImageURI
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
