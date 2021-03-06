import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CallHistory from '../screens/CallHistory';
import Profile from '../screens/Profile';
import Calls from '../screens/Calls'
import Search from '../screens/Search'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import colors from '../styles/colors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../redux/actions';
import RouterComponent from '../navigation/Router'

import EditVehicle from '../screens/EditVehicle'
import { createStackNavigator } from '@react-navigation/stack';

class BottomTabNavigator extends React.Component{

    stackNav = () => {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator initialRouteName="Profile"
            screenOptions={{
                headerShown: false
              }}>
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="VehicleManagement" component={EditVehicle} />
            </Stack.Navigator>
        );
    }

    render(){
        
        const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
            
                        if (route.name === 'Calls') {
                            iconName = focused
                                ? 'video'
                                : 'video-outline';
                        } else if (route.name === 'Call History') {
                            iconName = 'history';
                        }else if(route.name === 'Profile'){
                            iconName = focused ? 'account-card-details' : 'account-card-details-outline'
                        } else if (route.name === "Search"){
                            iconName = 'magnify'
                        }
            
                        // You can return any component that you like here!
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    })}
                    tabBarOptions={{
                        style : {backgroundColor: colors.background},
                        activeTintColor: colors.white,
                        inactiveTintColor: 'gray',
                        activeBackgroundColor:colors.background,
                        inactiveBackgroundColor:colors.background
                    }}
            >
                { this.props.userType == 'civilian'
                    ? <Tab.Screen name="Calls" component={Calls} />
                    : <Tab.Screen name="Search" component={RouterComponent} />
                }
                <Tab.Screen name="Call History"   component={CallHistory} />
                <Tab.Screen name="Profile" component={this.stackNav} />
            </Tab.Navigator>
        );
    }
};

const mapStateToProps = state => {
    return {
      userType: state.userType,
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(BottomTabNavigator);
  