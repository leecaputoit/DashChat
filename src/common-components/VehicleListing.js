import React, { useState, useEffect } from 'react';
import { StatusBar, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions} from 'react-native';




export const VehicleListing = ( props ) => {

    return (
        <View style={style.wrapper}>
            <Text style={style.textStyle}>
                {props.data.entryName}
            </Text>
            <Text style={style.textStyle}>
                {props.data.licensePlateNumber + ' ' + props.data.name + ' ' + props.data.year}
            </Text>
            <View style={style.icon}>

            </View>
        </View>
      );
}

const style = StyleSheet.create({
  textStyle:{
      color:"white",
      marginBottom:5,
      display:'flex',
  },
  wrapper:{
      marginTop: 20
  },
  icon:{
      height:10,
      width:10,
      backgroundColor:"white",
      alignSelf:'flex-end'
  }
});
