import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Login1 from './login1'; 
import signin from './login2';
import Dialogs from './dialog';
import MyDrawerNavigator from './MyDrawerNavigator';

const ModelNavigator = createStackNavigator({
    Login: Login1,
    // Dialogs: Dialogs,
    signin: signin,
    // MyDrawerNavigator : MyDrawerNavigator,
},
{
    headerMode: 'none',
    initialRouteName: 'Login',
    // resetOnBlur: true,
    // backBehavior: 'initialRoute'
});

export default ModelNavigator;