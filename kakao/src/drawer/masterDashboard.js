import React, { Component } from 'react';
import {createMaterialTopTabNavigator, createStackNavigator, DrawerActions, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Dashboard from '../views/dashboard/UserDashboard/dashboard';
// import EditGroup from '../views/editgroup';
import GroupDetails from '../views/dashboard/groupdetails';
import EditGroup from '../views/dashboard/EditGroup';
import ViewProfile from '../views/dashboard/viewProfile';
import AddPeople from '../views/dashboard/addPeople';
import Groups from '../views/dashboard/MasterDashboard/Groups';
import Users from '../views/dashboard/MasterDashboard/Users';
import {Text,View,StyleSheet,Platform,Dimensions,  } from 'react-native';
import {Font} from 'expo';
import {SearchBar, Divider,} from 'react-native-elements';
import { ScrollView, Button, SafeAreaView, ImageBackground,  AsyncStorage,ActivityIndicator } from 'react-native';
import Bg_Img from '../../assets/images/Edit-Profile.png';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;


const GroupsStack = createStackNavigator(
    {
      Groups: Groups,
    },
    {
      headerMode: 'none'
    }
  );
  
  
  const UsersStack = createStackNavigator(
    {
    Users: Users,
    },
    {
      headerMode: 'none'
    }
  );

  const MasterDashboard = createMaterialTopTabNavigator(
    {
      Groups: {
        screen: GroupsStack
      },
      Users:{
        screen: UsersStack
      },
      
    },
    {
      animationEnabled: true,
      swipeEnabled: true,
      tabBarPosition: "top",
      defaultNavigationOptions: ({ navigation }) => ({
         tabBarIcon :({ focused, horizontal, tintColor }) => {
           const { routeName } = navigation.state;
           let iconName;
           if (routeName === 'Users') {
            iconName = `ios-home${focused ? '' : ''}`;
          } else if (routeName === 'Groups') {
            iconName = `ios-search${focused ? '' : ''}`;
          }
  
          return <Ionicons name={iconName}  size={ horizontal ? 20 : 25} color ={ tintColor} style={{marginHorizontal: 10}}/>
         },
      }),
      tabBarOptions :{
        style:{
          ...Platform.select({
            android: {
              backgroundColor: 'transparent'
            },
            ios: {
              backgroundColor: 'transparent'
            }
          }),
          marginTop: 20,
          marginHorizontal: 30,
          paddingHorizontal: 20
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        
      }
    }
  );

  

  class Test extends React.Component{
    static router = MasterDashboard.router;
    constructor(props){
      super(props);
      this.state={
        fontLoaded: false,
        search: ''
      }
    }
  
    render(){
      const { navigation } = this.props;
      return(
       <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
                <View style={styles.statusBar} />
               <View style={styles.navBar}>
                 <View style={styles.container}>
                   <View style={styles.left}>
                     <Icon
                      name="bars"
                      size={20}
                      type="font-awesome"
                      iconStyle={{ color: "#ebebeb", marginLeft: 20 }}
                      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    // onPress={() => this.props.navigation.goBack()}
                    //   onPress={() => navigation.navigate('DrawerOpen')}
                    />
                  </View>
                  <View style={styles.middle}>
                    <Text style={styles.nameHeader}>Dashboard</Text>
                  </View>
                  <View style={styles.right}>
                    <Icon
                      name="ellipsis-v"
                      size={30}
                      type="font-awesome"
                      iconStyle={{ color: "#ebebeb" }}
                      onPress={() => console.log('threee dots')}
                      containerStyle={{ padding: 20 }}
                    // onPress={() => this.props.navigation.goBack()}
                    // onPress={() => navigation.navigate('DrawerOpen')}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderColor: 'transparent',
                  borderRadius: 22,
                  alignItems: 'center',
                  marginHorizontal: 30,
                  height: 80,
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 300,
                    borderWidth: 0.5,
                    borderColor: 'transparent',
                    marginHorizontal: 20,
                    height: 1,
                    marginVertical: 10,
                  }}
                />
                <View style={{ backgroundColor: 'white' }}>
                  <SearchBar
                    round
                    containerStyle={{ backgroundColor: 'white' }}
                    platform="ios"
                    placeholder="Search here..."
                    value={this.state.search}
                  />
                  <Divider /> 
                </View>
              </View>
          <MasterDashboard navigation={navigation}/>
      </ImageBackground>
      )
    }
  }
const styles = StyleSheet.create({
  list: {
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "black",
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 10
  },
  navBar: {
    height: 60,
    width: screenWidth,
  },
  container: {
    flex: 6,
    marginTop: 30,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  middle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameHeader: {
    color: '#ebebeb',
    fontSize: 20,
    fontFamily: 'bold',
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

const DashboardDrawerItem = createStackNavigator({
  MasterDashboard:{
    screen: Test,
    path: '/masterDashboard',
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
  // MasterDashboard1:{
  //     screen : MasterDashboard1,
  //     path: '/masterDashboard',
  //     navigationOptions: ({ navigation }) => ({
  //       header: null,
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
  //     }),
  // },
  // Groups: {
  //     screen: GroupsStack
  //   },
  //   Users:{
  //     screen: UsersStack
  //   },
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
  ViewProfile :{
  screen: ViewProfile,
  path: '/viewprofile',
  navigationOptions: ({ navigation }) =>({
    header: null
  })
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