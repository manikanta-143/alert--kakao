import React, { Component } from 'react';
import { createStackNavigator, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Dashboard from '../views/dashboard/UserDashboard/dashboard';
// import EditGroup from '../views/editgroup';
import GroupDetails from '../views/dashboard/groupdetails';
import EditGroup from '../views/dashboard/EditGroup';
import ViewProfile from '../views/ViewProfile';
import AddPeople from '../views/dashboard/addPeople';
import GroupIcon from '../views/dashboard/groupIcon';
import CameraScreen from '../views/dashboard/cameraPic';

const DashboardDrawerItem = createStackNavigator({
 
  Dashboard: {
    screen: Dashboard,
    path: '/dashboard',
    navigationOptions: ({ navigation }) => ({
      header: null,
      // title : "Group List",
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
  EditGroup: {
    screen: EditGroup,
    path: '/edit',
    navigationOptions: ({ navigation }) => ({
      header: null,

      // title : "Edit Group",
      // headerLeft: (
      //     <Icon
      //       name="angle-left"
      //       size={30}
      //       type="font-awesome"
      //       iconStyle={{ paddingLeft: 20 ,color: "gray" }}
      //       // onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}
      //       onPress={() => navigation.goBack()}
      //     />
      //   ),
    }),
  },
  GroupDetails: {
    screen: GroupDetails,
    path: '/details',
    navigationOptions: ({ navigation }) => ({
      // title : "Group Details",
      header: null,
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
  AddPeople: {
    screen: AddPeople,
    path: '/AddPeople',
    navigationOptions: ({ navigation }) => ({
      // title : "Enter new subject",
      header: null,
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
  GroupIcon: {
    screen: GroupIcon,
    path: '/groupicon',
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title : "Group icon",
      
    }),
  },
  CameraScreen:{
    screen: CameraScreen,
    path: '/cameraScreen',
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  }
},
);

DashboardDrawerItem.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
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

export default DashboardDrawerItem;