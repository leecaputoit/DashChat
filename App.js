import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/redux/reducers';
import Root from './src/navigation/Root'
import colors from "./src/styles/colors";
import thunk from 'redux-thunk';
import ConfirmationCode from './src/screens/ConfirmationCode'


console.disableYellowBox = true;

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
       {/* <ConfirmationCode /> */}
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
