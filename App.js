import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/redux/reducers';
import Root from './src/navigation/Root'
import colors from "./src/styles/colors";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import AuthenticationNavigator from "./src/navigation/AuthenticationNavigator";
import { NavigationContainer } from '@react-navigation/native';




const store = createStore(reducers);

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
       <Root />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
});
