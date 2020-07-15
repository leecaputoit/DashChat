import * as React from 'react';
import { createStackNavigator }  from '@react-navigation/stack';
import LandingPage from '../screens/LandingPage';
import Register from '../screens/Registration';
import LogIn from '../screens/LogIn';
import ForgotPassword from '../screens/ForgotPassword';
import NewPassword from '../screens/NewPassword';
import ConfirmationCode from '../screens/ConfirmationCode'
import colors from '../styles/colors'
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../screens/styles/AuthenticationBoilerplate';


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
                <Stack.Screen 
                    name="LandingPage"     
                    component={LandingPage} 
                    options={({ navigation }) => ({
                      })}/>
                <Stack.Screen 
                        name="Register"     
                        component={Register}
                        options={({ navigation }) => ({
                          })}/>
                <Stack.Screen 
                        name="LogIn"   
                        component={LogIn} 
                        options={({ navigation }) => ({
                            headerTitle: "",
                            headerRight: () => (
                              <Button
                                style = {styles.forgotPassword}
                                onPress={() => navigation.navigate("ForgotPassword")}
                                title="Forgot Password?"
                                color= {colors.black}
                              />
                            ),
                          })}/>
                <Stack.Screen 
                    name="ForgotPassword"     
                    component={ForgotPassword} 
                />
                <Stack.Screen 
                    name="NewPassword"     
                    component={NewPassword} 
                />
                <Stack.Screen 
                    name="ConfirmationCode"     
                    component={ConfirmationCode} 
                />
            </Stack.Navigator>
        );
    }
};