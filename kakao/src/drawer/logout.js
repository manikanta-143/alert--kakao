import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Logout from '../views/Logout';

const LogoutDrawerItem = createStackNavigator({
  Logout: {
    screen: Logout,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
});

LogoutDrawerItem.navigationOptions = {
  drawerLabel: 'Logout',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="library-books"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
        color: 'gray'
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default LogoutDrawerItem;
