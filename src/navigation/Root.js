import React from 'react';
import { connect } from 'react-redux';
import BottomTabNavigator from "./BottomTabNavigator";
import AuthenticationNavigator from "./AuthenticationNavigator";
import { NavigationContainer } from '@react-navigation/native';


class Root extends React.Component {
    render() {
        //console.disableYellowBox = true;
        const isSignedIn = this.props.loggedIn;
        return (
            <NavigationContainer>
                {
                    isSignedIn
                    ?<BottomTabNavigator />
                    :<AuthenticationNavigator />
                } 
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  }
};


export default connect(mapStateToProps)(Root);
