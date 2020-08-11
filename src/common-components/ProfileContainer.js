import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from 'react-native';
import styles from '../screens/styles/ProfilePage';
import FileDisplayModal from '../common-components/FileDisplayModal'
import { retrieveFileURI } from '../Utility/FileStorageAPI'

export const ProfileContainer = ( props ) => {

    //if no user is passed or user was not found
    //return an empty view
    if(!props.userInfo){
        return (
            <View>
            
            </View>
        );
    }


    const [isVisible, setVisibility] = useState(false);
    const [imageSource, setImageSource] = useState();

    //handle the drivers license button that displays user files
    let driversLicenceButton;
    if(props.userInfo.store?.length && props.userInfo.store.length > 0){
        driversLicenceButton = (<View style={styles.driversLicenceContentContainer}>
            <FileDisplayModal isPolice= {true} passedUser={props.userInfo} isVisible={isVisible} toggleVisibility={() => { setVisibility(!isVisible) }} resource={props.userInfo.store.find(doc => doc.name ==='DriversLicence')} />
            <TouchableOpacity style ={styles.buttonStyles} onPress={() => { setVisibility(!isVisible) }}>
              <Text style={styles.textStyles}>
                {"View Driver's Licence"}
              </Text>
            </TouchableOpacity>
          </View>
        );
    }else{
        driversLicenceButton = (
            <View style ={styles.buttonStyles}>
              <Text style={styles.textStyles}>
                {"View Drivers's License"}
              </Text>
            </View>
        );
    }

    //retrieve vehicle info
    let plateNumber;
    let vehicleText;
    if(props.searchParameter && props.userInfo.vehicles){
        plateNumber = props.searchParameter;
        let vehicleInfo = props.userInfo.vehicles.find((vehicle => (vehicle.licensePlateNumber === plateNumber)));
        if(vehicleInfo){
            vehicleText = vehicleInfo.name;
        }else{
            vehicleText = "N/a";
        }
    }else{
        plateNumber = "ERMT73";
        vehicleText = "Honda CR-V";
    }

    //set profile image
    React.useEffect(() => {
        const getURI = async () => {
            let profileImageSource = await retrieveFileURI("ProfileImage", props.userInfo);
            if(profileImageSource.length > 0){
                setImageSource({ uri: profileImageSource })
            }else{
                setImageSource(require('../img/noProfileImageFound.jpg'));
            }
        }
        getURI();
    }, []);

    return (
        <ScrollView style={style.scrollView}>
            <View style={styles.mainWrapper}>
                <View style={style.titleContainer}>
                    <Text style={style.textLarge}>
                        {plateNumber}
                    </Text>
                    <Text style={style.textMedium}>
                        {vehicleText}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.imageStyles}
                        source={
                            imageSource
                        }
                    />
                </View>
                
                <View style={styles.nameContainer}>
                    <Text style={styles.nameStyles}>
                        { props.userInfo.first_name + ' ' +  props.userInfo.last_name }
                    </Text>
                </View>
                
                <View style={styles.buttonContainer}>
                    {driversLicenceButton}
                    <Text style={styles.vehiclesTitle}>
                        {"Registered Vehicles"}
                    </Text>
                </View>
        </View>
    </ScrollView>
      );
}

//temporary style sheet, most other styles are taken from profile page stylesheet
const style = StyleSheet.create({
    titleContainer:{
        alignSelf:'flex-start',
        marginLeft:75
    },
    textLarge:{
        color:"white",
        fontSize:36
    },
    textMedium:{
        color:"white",
        fontSize:24,
        marginBottom: 15
    },
    scrollView:{
        height: Dimensions.get('window').height * 1,
        width: Dimensions.get('window').width
    }
});


    

    


   


