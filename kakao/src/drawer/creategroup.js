import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import CreateGroup from '../views/CreateGroup';
import Dashboard from '../views/dashboard/UserDashboard/dashboard';
const PhonbookDrawerItem = createStackNavigator({
  CreateGroup: {
    screen: CreateGroup,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
    
      // title : "CreateGroup",
      // headerLeft: (
      //     <Icon
      //       name="angle-left"
      //       size={30}
      //       type="font-awesome"
      //       iconStyle={{ paddingLeft: 20 ,color: "gray" }}
      //       onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}
      //     //   onPress={() => navigation.navigate('DrawerOpen')}
      //     />
      //   ),
    }),
    
  },
  // Dashboard:{
  //   screen: Dashboard,
  //   path: '/dashboard',
  //   navigationOptions: ({ navigation }) =>({
  //     header: null,
  //       // title : "Group List",
  //       // headerLeft: (
  //       //     <Icon
  //       //       name="angle-left"
  //       //       size={30}
  //       //       type="font-awesome"
  //       //       iconStyle={{ paddingLeft: 20 ,color: "gray" }}
  //       //       onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}
  //       //     //   onPress={() => navigation.navigate('DrawerOpen')}
  //       //     />
  //       //   ),
  //       }),
  //     },
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