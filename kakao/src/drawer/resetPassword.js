import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ResetPassword from '../views/ResetPassword';

const ResetPasswordDrawerItem = createStackNavigator({
  ResetPassword: {
    screen: ResetPassword,
    path: '/resetpassword',
    navigationOptions: ({ navigation }) => ({
      header: null
      // title : "ResetPassword",
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

ResetPasswordDrawerItem.navigationOptions = {
  drawerLabel: 'ResetPassword',
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

export default ResetPasswordDrawerItem;