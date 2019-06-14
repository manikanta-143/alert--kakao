import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import EditProfile from '../views/EditProfile';

const PhonbookDrawerItem = createStackNavigator({
  EditProfile: {
    screen: EditProfile,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null
      // title : "EditProfile",
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
  drawerLabel: 'EditProfile',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="edit"
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

export default PhonbookDrawerItem;