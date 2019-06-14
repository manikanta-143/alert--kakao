import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
// import CreateGroup from '../views/CreateGroup';
import CreateGroup from './views/CreateGroup';

const PhonbookDrawerItem = createStackNavigator({
  CreateGroup: {
    screen: CreateGroup,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
    
  },

},
  {
    initialRouteName: 'CreateGroup'
  }
);
PhonbookDrawerItem.navigationOptions = {
  
  drawerLabel: 'CreateGroup',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="person-add"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
        color: 'gray'
      }}
      type="ionicons"
      color={tintColor}
    />
  ),
};

export default PhonbookDrawerItem;