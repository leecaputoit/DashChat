import React, { Component } from 'react';
import { Button, StatusBar, Image, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native';
import colors from '../styles/colors';
import RoundedButton from '../common-components/RoundedButton';
import getTheme from '../../native-base-theme/components';
import custom from '../../native-base-theme/variables/platform';
import styles from './styles/Registration';
import baseStyles from './styles/AuthenticationBoilerplate';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { Item, Form, Label, Input, Container, Text, View, StyleProvider } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connectStyle } from 'native-base';
import InputField from '../common-components/InputField'
import Notification from '../common-components/Notification';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser, updateUser } from '../graphql/mutations'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


class EditVehicle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entryName:'',
      name:'',
      licensePlateNumber:'',
      year:'',

    };

    this.handleEntryNameChange = this.handleEntryNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLicensePlateNumberChange = this.handleLicensePlateNumberChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }


  handleNameChange(text) {
    this.setState({ name: text });
  }
  handleLicensePlateNumberChange(text) {
    this.setState({ licensePlateNumber: text });
  }
  handleYearChange(text) {
    this.setState({ year: text });
  }
  handleEntryNameChange(text) {
    this.setState({ entryName: text });
  }
  

  async updateBackend(){
    let updateObject = { id: this.props.user.id };
    let update = {
        entryName: this.state.entryName,
        name: this.state.name,
        year: this.state.year,
        licensePlateNumber: this.state.licensePlateNumber
    };

    if(this.props.user.vehicles){
        updateObject.vehicles = [ ...this.props.user.vehicles.filter(vehicle => vehicle.name !== update.name), update];
    }else {
        updateObject.vehicles = [ update ];
    }
    
     await API.graphql(graphqlOperation(updateUser, {input: updateObject}));

     this.props.setUser({
         ...this.props.user,
         vehicles: updateObject.vehicles
     })
  }

 
  render() {
    const { entryName,name,licensePlateNumber,year } = this.state;
    
    return (
      <KeyboardAvoidingView
      style={{backgroundColor: colors.background, display: 'flex', flex: 1}}
      behavior="padding"
      >
        <ScrollView style = {baseStyles.wrapper}>
          <Text style={baseStyles.headerText}>
            Edit Car 
          </Text>
          <InputField
            labelText="Entry Name"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="text"
            customStyle={{ marginBottom: 15 }}
            onChangeText={this.handleEntryNameChange}
            autoFocus
            autoCapitalize={"words"}
            //showCheckmark={this.state.validFirstName}
          />
          <InputField
            labelText="Name"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="text"
            customStyle={{ marginBottom: 15 }}
            onChangeText={this.handleNameChange}
            autoFocus
            autoCapitalize={"words"}
            //showCheckmark={this.state.validLastName}
          />
          <InputField
            labelText="Year"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="text"
            //showCheckmark={this.state.validEmail}
            customStyle={{ marginBottom: 15 }}
            onChangeText={this.handleYearChange}
            //validEmail={this.state.validEmail}
            autoFocus
            autoCapitalize={"none"}
            //iconName="envelope"
          />
          
          <InputField
            labelText="License Plate Number"
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            iconPosition="left"
            borderBottomColor={colors.white}
            inputType="text"
            //showCheckmark={this.state.validPassword}
           // validPassword={this.state.validPassword}
            customStyle={{ marginBottom: 15 }}
            onChangeText={this.handleLicensePlateNumberChange}
            autoFocus
            autoCapitalize={"words"}
          />
          
          <TouchableOpacity
            style={baseStyles.nextButtonStyle}
            title={"Add Vehicle"}
            onPress={async() => {await this.updateBackend(); this.props.navigation.goBack();}}
           // disabled={!formValid}
          >
            <Text style={
              Object.assign({},
                baseStyles.nextButtonText,
                { color:  colors.white })}
            > Submit </Text>
            <Icon
              name="angle-right"
              color={colors.white }
              size={22}
              style={styles.icon}
            />
          </TouchableOpacity>
        </ScrollView>
        {/* <View style={[baseStyles.errorMessageWrapper, { marginTop: notificationMarginTop }]}>
          <Notification
            showNotification={showErrorMessage}
            handleCloseNotification={this.handleCloseNotification}
            type="Error:"
            firstLine={errorMessage}
            secondLine={resolutionMessage}
          />
        </View> */}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(EditVehicle);
