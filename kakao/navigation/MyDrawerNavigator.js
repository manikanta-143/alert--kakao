import React, { Component } from 'react';
import { Button, StyleSheet, Dimensions, Image, View, Text, AsyncStorage } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems, DrawerNavigator } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import PhonebookScreen from '../src/drawer/phonebook';
import EditProfile from '../src/drawer/editprofile';
import Dashboard from '../src/drawer/dashboard';
import CreateGroup from '../src/drawer/creategroup';
import AddUsers from '../src/drawer/addusers';

const SCREEN_WIDTH = Dimensions.get('window').width;
var role = 1;

class CustomDrawerContentComponent extends Component {
  state = {
    userrole: ""
  };
  componentDidMount() {
    this._loadInitialState();

  }
  _loadInitialState = async () => {
    var userrole = await AsyncStorage.getItem('userrole');
    this.setState({ userrole: userrole }, () => role = userrole);
  }
  render() {
    console.log('role id', role)
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {/* #43484d */}
        <View
          style={{ marginTop: 40, marginLeft: 10, flexDirection: 'row' }}
        >
          {/* <Image
        source={require('./src/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57  }}
        resizeMode="contain"
      /> */}
          <Avatar
            small
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
            }}
            activeOpacity={0.7}
            width={100}
            height={100}
            avatarStyle={{ borderRadius: 100 / 2 }}
            overlayContainerStyle={{ backgroundColor: 'transparent', marginLeft: 10 }}
          />
          <Text style={{ color: '#FF5628', fontSize: 20, paddingLeft: 20, marginTop: 20 }}>Krishna</Text>
        </View>
        <Text>{this.props.navigation.state.params.role}  </Text>
        <View style={{ marginLeft: 10 }}>
          <DrawerItems {...this.props} />
        </View>
      </View>
    )
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    path: '/dashboard',
    screen: Dashboard
  },
  Phonebook: {
    path: '/phonebook',
    screen: PhonebookScreen,
  },
  EditProfile: {
    path: '/editprofile',
    screen: EditProfile
  },
  CreateGroup: {
    path: '/creategroup',
    screen: CreateGroup
  },
  AddUsers: role == 1 ? { path: '/s', screen: AddUsers } : { path: '/s', screen: EditProfile }
},
  {
    initialRouteName: 'Dashboard',

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

export default MyDrawerNavigator;
