import React, { Component } from 'react';
import { Button, StyleSheet, Dimensions, Image, View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems, DrawerNavigator,createSwitchNavigator } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import PhonebookScreen from '../src/drawer/phonebook';
import EditProfile from '../src/drawer/editprofile';
// import Dashboard from '../src/drawer/dashboard';
import Dashboard from '../src/drawer/masterDashboard';
import CreateGroup from '../src/drawer/creategroup';
import Logout from '../src/drawer/logout';
import AboutUs from '../src/drawer/aboutus';
import ViewProfile from '../src/drawer/viewprofile';
import AddUsers from '../src/drawer/addusers';
import ResetPassword from '../src/drawer/resetPassword';
import * as _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;

class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    this._loadProfile();
  }

  componentWillReceiveProps() {
    this._loadProfile();
  }

  _loadProfile = async () => {
    var id = await AsyncStorage.getItem('userId');
    var token = await AsyncStorage.getItem('STORAGE_KEY');

    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/profiles/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(profile => this.setState({ profile }))
      .catch(error => alert(error));
  }

  render() {
    const { profile } = this.state;

    if (_.isEmpty(profile)) {
      return null;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ marginTop: 40, marginLeft: 10, flexDirection: 'row' }}
        >
          {/* <Image
            source={require('./src/images/logo.png')}
            style={{ width: SCREEN_WIDTH * 0.57  }}
            resizeMode="contain"
          /> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ViewProfile')}
          >

            <Avatar
              title={profile.name}
              small
              rounded
              source={{
                uri: profile.photoUrl || 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
              }}
              activeOpacity={0.7}
              width={80}
              height={80}
              containerStyle={{ borderWidth: 2, borderColor: '#FF5628', padding: 5, borderRadius: 80 / 2, width: 80, height: 80 }}
              avatarStyle={{ borderRadius: 80 / 2 }}
              overlayContainerStyle={{ backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>

          <Text style={{ flex:1,flexWrap:'nowrap', color: '#FF5628', fontSize: 20, paddingLeft: 20, marginTop: 20 ,maxWidth:SCREEN_WIDTH * 0.8}}>{profile.name}</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <DrawerItems {...this.props} />
        </View>
      </View>
    );
  }
}

const MasterDrawer = createDrawerNavigator({
  
  MasterDashboard: {
    path: '/dashboard',
    screen: Dashboard
  },
  Phonebook: {
    path: '/phonebook',
    screen: PhonebookScreen,
  },
  EditProfile: {
    path: '/editprofile',
    screen: EditProfile,
  },
  CreateGroup: {
    path: '/creategroup',
    screen: CreateGroup
  },
  AddUsers: {
    path: '/addusers',
    screen: AddUsers
  },
  Logout: {
    path: '/logout',
    screen: Logout
  },
  AboutUs: {
    path: '/aboutus',
    screen: AboutUs
  },
  ResetPassword : {
    path: '/resetpassword',
    screen: ResetPassword
  },
  ViewProfile: {
    screen: ViewProfile,
    path: '/viewprofile',
  }
},
  {
    initialRouteName: 'MasterDashboard',
    resetOnBlur:true,
    backBehavior: 'initialRoute',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#FF5628',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 10,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

// const SwitchDrawer = createAppContainer(createSwitchNavigator(
  
//   {
//     MasterDrawer:
//     {
//       path : '/dash',
//       screen: MasterDrawer
//     } 
//   },
//   {
//     initialRouteName: 'MasterDrawer',
//     resetOnBlur: true,
//     backBehavior: 'initialRoute'
//   }
// ));

export default MasterDrawer;

