import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import AboutUs from '../views/aboutUs/AboutUs';

const AboutUsDrawerItem = createStackNavigator({
  AboutUs: {
    screen: AboutUs,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
});

AboutUsDrawerItem.navigationOptions = {
  drawerLabel: 'AboutUs',
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

export default AboutUsDrawerItem;