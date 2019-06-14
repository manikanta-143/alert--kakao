import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { View, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import AddUsers from '../views/addUser/AddUsers';

const role = AsyncStorage.getItem('userrole');
const PhonbookDrawerItem = createStackNavigator({
  AddUsers: {
    screen: AddUsers,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
      // drawerLabel: navigation.state.params.role === 3 ? 'AddUser': ()=> null,
      // title : "AddUsers",
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
});
PhonbookDrawerItem.navigationOptions = {
  drawerLabel: 'AddUser',
  // drawerLabel: ()=> null,
  drawerLockMode: 'locked-closed',
  isActive: false,
  //     drawerIcon: ({ tintColor }) => (
  //   <Icon
  //   name="adduser"
  //     // person-add
  //     // address-book
  //     size={30}
  //     iconStyle={{
  //       width: 30,
  //       height: 30,
  //       color: 'gray'
  //     }}
  //     type="antdesign"
  //     // font-awesome
  //     color={tintColor}
  //   />
  // ),
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="adduser"
      // person-add
      // address-book
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
        color: 'gray'
      }}
      type="antdesign"
      // font-awesome
      color={tintColor}
    />
  ),
};

export default PhonbookDrawerItem;
