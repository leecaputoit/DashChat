import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from '../screens/LandingPage';
import Register from '../screens/Registration';

export default class AuthenticationNavigator extends React.Component{

    render(){
        const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator
               screenOptions={{tabBarVisible:false}}
            >
                <Tab.Screen name="SignIn"     component={SignIn} />
                <Tab.Screen name="Register"   component={Register} />
            </Tab.Navigator>
        );
    }
};