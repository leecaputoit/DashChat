import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import styles from './styles/ProfilePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import ImageSelector from '../common-components/ImageSelector'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { uploadToStorage, readFromStorage } from '../Utility/FileStorageAPI'

class Profile extends Component {


  constructor(props) {
    super(props);
    this.state = { user: null, customState: null };

    this.onLogOutPress = this.onLogOutPress.bind(this);
  }

  componentDidMount(){
    this.props.initiateSetProfileImg();
  }

  onLogOutPress() {
    this.props.setLoggedIn(false)
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
            source={{uri:this.props.profileImageURI}}
          />
          <ImageSelector style={styles.imagePicker} handleResult={uploadToStorage}/>
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

const mapStateToProps = state => {
  return {
    profileImageURI : state.profileImageURI,
    userIdentifier: state.userIdentifier
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
