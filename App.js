import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "./src/common-components/BottomTabNavigator";
import AuthenticationNavigator from "./src/common-components/AuthenticationNavigator";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/redux/reducers';
import colors from "./src/styles/colors";
import Registration from "./src/screens/Registration"
import LogIn from './src/screens/LogIn'


const store = createStore(reducers);
export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    //---------Authentication flow above
    const isSignedIn = false;

    return (

      <NavigationContainer>
        {
          isSignedIn
          ?<BottomTabNavigator />
          :<AuthenticationNavigator />
        } 
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
});
