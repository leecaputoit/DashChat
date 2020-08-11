import React, { Component } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, ImageStore, FlatList ,ScrollView, SafeAreaView} from 'react-native';
import colors from '../styles/colors';
import styles from './styles/ProfilePage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import ImageSelector from '../common-components/ImageSelector'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DocumentSelector from '../common-components/DocumentSelector'
import { uploadFileToStorage } from '../Utility/FileStorageAPI'
import FileDisplayModal from '../common-components/FileDisplayModal'
import { getUserByLicensePlateNumber } from '../Utility/ProximitySearch'
import * as Location from 'expo-location'
import VehicleListing from '../common-components/VehicleListing'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import Amplify from '@aws-amplify/core'
import { Auth } from 'aws-amplify';
class Profile extends Component {

  state = {
    driversLicenceModalToggle: false
  };

  toggleDriversLicenceModal(){
    this.setState(prevState => ({driversLicenceModalToggle: !prevState.driversLicenceModalToggle}));
  }

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
    Location.stopLocationUpdatesAsync('userLocationTracking')

  }


  render() {
    let imageSource;
    if(this.props.profileImageURI.length === 0){
      imageSource = require('../img/noProfileImageFound.jpg');
    }else{
      imageSource = {uri: this.props.profileImageURI}
    }

    let vehicleArray = [
      {
        entryName:'PlaceHolder',
        name:"N/A",
        year:'N/A',
        licensePlateNumber:'N/A'
      }
    ];
    if(this.props.user.vehicles){
      vehicleArray = this.props.user.vehicles;
    }

    const renderVehicleListing = ({item}) => (
      <VehicleListing data={item} navigateToEdit={() => {this.props.navigation.navigate("VehicleManagement")}}/>
    );
    

    let driversLicenceButton;
    if(this.props.user.store && this.props.user.store.find(doc => doc.name === 'DriversLicence')){
      driversLicenceButton = (<View style={styles.driversLicenceContentContainer}>
                                <FileDisplayModal isVisible={this.state.driversLicenceModalToggle} toggleVisibility={() => {this.toggleDriversLicenceModal()}} resource={this.props.user.store.find(doc => doc.name ==='DriversLicence')}/>
                                <TouchableOpacity style ={styles.buttonStyles} onPress={() => {this.toggleDriversLicenceModal()}}>
                                  <Text style={styles.textStyles}>
                                    {"View Driver's Licence"}
                                  </Text>
                                </TouchableOpacity>
                                <DocumentSelector style={styles.documentUpload} handleResult={uploadFileToStorage} documentType="DriversLicence">
                                  <MaterialCommunityIcons name='file-upload-outline' size={40} color="white" />
                                </DocumentSelector>
                              </View>
      );
    }else{
      driversLicenceButton = (
                              <DocumentSelector style={styles.buttonStyles} handleResult={uploadFileToStorage} documentType="DriversLicence">
                                <Text style={styles.textStyles}>
                                  {"Upload Driver's Licence"}
                                </Text>
                              </DocumentSelector>
                              );
    }
    return (

    //   <View style={styles.mainWrapper}>
    //   <TouchableOpacity
    //   style={styles.logOutButtonStyle}
    //   onPress = {this.onLogOutPress}>
    //       <Text style={styles.logOutTextStyle}>
    //       {"Log out"}
    //     </Text>
    //   </TouchableOpacity>

    //   <StatusBar backgroundColor={colors.background} barStyle="light-content" />
    //   <View style={styles.imageContainer}>
    //     <Image 
    //       style={styles.imageStyles}
    //       source={
    //         imageSource
    //         }
    //     />
    //     <ImageSelector style={styles.imagePicker} handleResult={uploadFileToStorage}/>
    //   </View>
      
    //   <View style={styles.nameContainer}>
    //     <Text style={styles.nameStyles}>
    //       { this.props.user.first_name + ' ' +  this.props.user.last_name }
    //     </Text>
    //   </View>
      
    //   <View style={styles.buttonContainer}>
    //       {driversLicenceButton}
    //         <Text style={styles.vehiclesTitle}>
    //             {"Registered Vehicles"}
    //         </Text>
    //         <TouchableOpacity style={{alignSelf:'center'}}onPress={() =>{this.props.navigation.navigate("VehicleManagement")}  }>
    //           <Text style={{color:"white"}}> Add a vehicle <MaterialIcons name="touch-app" size={14} color="white" /></Text>
    //         </TouchableOpacity>
       
    //       <View style={{flex:1}}> 
    //         <FlatList 
    //           data={vehicleArray}
    //           renderItem={renderVehicleListing}
    //           keyExtractor={item => item.id}
    //           contentContainerStyle={{flexGrow:1}}
    //           />
    //       </View>
           
    //   </View>
          

      
      
    // </View>
    <FlatList
          ListHeaderComponent={
            <View style={styles.wrapper}>
              <StatusBar backgroundColor={colors.background} barStyle="light-content" />
              <TouchableOpacity
                style={styles.logOutButtonStyle}
                onPress={this.onLogOutPress}>
                <Text style={styles.logOutTextStyle}>
                  {"Log out"}
                </Text>
              </TouchableOpacity>
 
              <View style={styles.imageContainer}>
                <Image
                  style={styles.imageStyles}
                  source={
                    imageSource
                  }
                />
                <ImageSelector style={styles.imagePicker} handleResult={uploadFileToStorage} />
              </View>
 
              <View style={styles.nameContainer}>
                <Text style={styles.nameStyles}>
                  {this.props.user.first_name + ' ' + this.props.user.last_name}
                </Text>
              </View>
 
              <View style={styles.buttonContainer}>
                {driversLicenceButton}
                <Text style={styles.vehiclesTitle}>
                  {"Registered Vehicles"}
                </Text>
                <TouchableOpacity style={{alignSelf:'center'}}onPress={() =>{this.props.navigation.navigate("VehicleManagement")}  }>
               <Text style={{color:"white"}}> Add a vehicle <MaterialIcons name="touch-app" size={14} color="white" /></Text>
            </TouchableOpacity>
              </View>
            </View>
          }
          style = {{backgroundColor: colors.background}}
          data={vehicleArray}
          renderItem={renderVehicleListing}
          keyExtractor={item => item.id}
        />
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
