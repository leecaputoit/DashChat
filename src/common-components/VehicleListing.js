import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser, updateUser } from '../graphql/mutations'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const VehicleListing = ( props ) => {

    
    

    return (
        <View style={style.wrapper}>
            <View style={{flex:1, flexDirection:"row"}}>
                <View style={{flex:1, flexDirection:'column'}}>
                    <Text style={style.textStyle}>
                        {props.data.entryName}
                    </Text>
                    <Text style={style.textStyle}>
                        {props.data.licensePlateNumber + ' ' + props.data.name + ' ' + props.data.year}
                    </Text>
                </View>
                {
                    props.navigateToEdit ? 
                    <View style={style.icon}>
                        <TouchableOpacity onPress={() =>{props.navigateToEdit()}  }>
                            <MaterialCommunityIcons name='square-edit-outline' size={15} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => { let result = await removeVehicleBackend(props.user, props.data); props.setUser(result);}}>
                            <MaterialCommunityIcons name='delete' size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                    :
                    null

                }
            </View>
               
        </View>
      );
}

const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(VehicleListing); 
  



const removeVehicleBackend = async(user, vehiclePassed) => {
    let updateObject = { id: user.id };

    updateObject.vehicles = user.vehicles.filter( vehicle => vehicle.name !== vehiclePassed.name);
    
     await API.graphql(graphqlOperation(updateUser, {input: updateObject}));

     return {
         ...user,
         vehicles:updateObject.vehicles
     };
}

const style = StyleSheet.create({
  textStyle:{
      color:"white",
      marginBottom:5,
      display:'flex',
  },
  wrapper:{
        display: 'flex',
        flexDirection: "row",
        backgroundColor: "black",
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf: "center",
        width:Dimensions.get('window').width * .55,

  },
  icon:{
      alignSelf:'flex-end',
      paddingBottom:10,
      display:'flex',
      flexDirection:'row'
  }
});
