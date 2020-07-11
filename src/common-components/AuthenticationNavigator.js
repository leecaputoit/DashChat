import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator }  from '@react-navigation/stack';
import LandingPage from '../screens/LandingPage';
import Register from '../screens/Registration';
import LogIn from '../screens/LogIn';
import colors from '../../src/styles/colors'

export default class AuthenticationNavigator extends React.Component{

    render(){
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator
                initialRouteName="LandingPage"
                screenOptions= {{
                    title: "",
                    headerStyle: { backgroundColor: colors.background, 
                                   shadowColor: 'transparent',},
                    headerTintColor: '#ffffff',
                }}
            >
                <Stack.Screen name="LandingPage"     component={LandingPage} />
                <Stack.Screen name="Register"   component={Register} />
                <Stack.Screen name="LogIn"   component={LogIn} />
            </Stack.Navigator>
        );
    }
};