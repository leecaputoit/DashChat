import React, { Component } from 'react';
import { StatusBar, Text, View, TouchableHighlight, ScrollView,StyleSheet } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import colors from '../styles/colors';
import styles from './styles/CallHistory';
import { getUserByLicensePlateNumber } from '../Utility/ProximitySearch'
import {ProfileContainer} from '../common-components/ProfileContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';

const style = StyleSheet.create({
    view:{
      marginBottom: 200
    }
});

 class Search extends Component {

  // async getUser(){
  //   await getUserByLicensePlateNumber('123');
  // }

  componentDidMount(){
    // this.getUser();
  }
  constructor(props) {
    super(props);
    
  }

  render() {
    
    return (
        // Use a flat-list to display previous recordings
      <View style={styles.mainWrapper}>
        <StatusBar backgroundColor={colors.white} barStyle="light-content" />
        <View style={styles.welcomeWrapper}> 
          <Text style={styles.welcomeText}>
          </Text>
          <View style={style.view}>

          </View>
          <ProfileContainer userInfo={this.props.user} searchParameter={'1'}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Search); 