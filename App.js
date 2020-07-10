import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './src/screens/LandingPage';
import CallHistory from './src/screens/CallHistory';
import Profile from './src/screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from "./src/common-components/BottomTabNavigator";
import AuthenticationNavigator from "./src/common-components/AuthenticationNavigator";
import colors from "./src/styles/colors";

export default function App() {


  //---------Authentication flow above
  let isSignedIn = true;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
