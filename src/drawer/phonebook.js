import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Phonebook from '../views/phonebook/phonebook';
import MenuItem from '../components/MenuItem';
import EditPhoneBook from '../views/phonebook/EditPhoneBook';
import CreatePhoneBook from '../views/phonebook/CreatePhoneBook';
import ViewProfile from '../views/phonebook/userProfile';

const PhonbookDrawerItem = createStackNavigator({
  Phonebook: {
    screen: Phonebook,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
      // title : "Phonebook",
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
  MenuItem: {
    screen: MenuItem,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
      // title : "Phonebook",
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
  EditPhoneBook: {
    screen: EditPhoneBook,
    path: '/editphonebook',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  UserViewProfile: {
    screen: ViewProfile,
    path: '/ViewProfile',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  CreatePhoneBook: {
    screen: CreatePhoneBook,
    path: '/createPhoneBook',
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

PhonbookDrawerItem.navigationOptions = {
  drawerLabel: 'Phonebook',
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

export default PhonbookDrawerItem;
