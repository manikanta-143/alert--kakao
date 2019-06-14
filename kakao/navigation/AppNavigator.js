import React from 'react';
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MyDrawerNavigator from './MyDrawerNavigator';
import ModelNavigator from './MainLoginScreen';
import MasterDrawer from './MasterDrawer';
import UserDrawer from './UserDrawer';
const Navigatore = createStackNavigator(
  {
    MyDrawerNavigator: MyDrawerNavigator,
    MasterDrawer: MasterDrawer,
    UserDrawer: UserDrawer,
    ModelNavigator: ModelNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'ModelNavigator'
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AppContainer:{
      screen: Navigatore,
      path: '/root'
    } 
  },
  {
    initialRouteName: 'AppContainer',
    resetOnBlur: true,
    backBehavior: 'initialRoute'
  }
));