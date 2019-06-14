import React from 'react';
import { View, StyleSheet, ScrollView, Button, SafeAreaView, ImageBackground, Dimensions, AsyncStorage,ActivityIndicator,RefreshControl } from 'react-native';
import { Text, Icon, ListItem, SearchBar, Divider } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Bg_Img from '../../../../assets/images/Edit-Profile.png';
import { Font } from 'expo';
import { DrawerActions,createAppContainer,createStackNavigator } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import * as _ from 'lodash';

const screenWidth = Dimensions.get('window').width;

class Dashboard extends React.Component {
  state = {
    fontLoaded: false,
    search: '',
    groups: {
      items: [],
    },
    id: null,
    refreshing: false,
    spinner: true
  }
  _groups = null;

  setContactRef = ref => {
    this._groups = ref
  };

  showGroup = (e,id) => {
    this._groups.show()
    this.setState({id})
    console.log('show contact id is',id)
  };

  hideGroup = () => {
    this._groups.hide()
  };
  
  componentDidUpdate(){
  this._getAllGroups();
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.navigation, this.props.navigation)) {
      this._getAllGroups();
    }
  }

  DeleteGroup = async() =>{
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await this.hideGroup()
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups/delete`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        groupId : this.state.id
      })
    })
      .then(() => alert('Group deleted successfully'),
      this._getAllGroups()
      )
      .catch((err) => alert(err))
      .done();
    }
    componentWillMount(){
      this._getAllGroups();
      this._loadFont();
    }
  _loadFont = async () => {
    await Font.loadAsync({
        georgia: require('../../../../assets/fonts/Georgia.ttf'),
        regular: require('../../../../assets/fonts/Montserrat-Regular.ttf'),
        light: require('../../../../assets/fonts/Montserrat-Light.ttf'),
        bold: require('../../../../assets/fonts/Montserrat-Bold.ttf'),
    });
    this.setState({spinner: !this.state.spinner,fontLoaded: true })
}
  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(!_.isEqual(prevState, this.state));

  //   // if (!_.isEqual(prevState.groups, this.state.groups)) {
  //   //   console.log('here', this.props);
  //     this._getAllGroups();
  //   // } else {
  //   //   console.log('else');
  //   // }
  // }

 _onRefresh =() =>{
   this.setState({ refreshing : true});
   this._getAllGroups().then(() =>{
     this.setState({ refreshing : false})
   })
 }

  _getAllGroups = async () => {
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await fetch(global.creategroup, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ groups: json });
      })
      .done();
  };

  render() {
    const { navigation } = this.props;
    const { groups } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ebebeb' }}
          >
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
              <ScrollView
              
               refreshControl={
                 <RefreshControl
                   refreshing={this.state.refreshing}
                   onRefresh={this._onRefresh}
                 />
               }
            
              >
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Menu
                    ref={this.setContactRef}
                    button={<Text onPress={this.showGroup}></Text>}
                  >
                    <MenuItem
                     onPress={()=> Alert.alert('Selected Element was deleted')}
                     
                     >Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.DeleteGroup}>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideGroup}>Share</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideGroup}>Create shortcut</MenuItem>
                  </Menu>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                  <View style={styles.list}>
                    {groups.items.map((group, i) => (
                      <ListItem
                        leftAvatar={{
                          title: group.groupName[0],
                          source: { uri: group.groupImage } 

                          // , source: { uri: l.groupName } 
                        }}
                        key={i}
                        title={group.groupName}
                        //  subtitle={l.phonenumber}
                        chevron
                        bottomDivider
                        onPress={() => this.props.navigation.navigate('GroupDetails',{
                          groupName: group.groupName,                          
                          Gid: group.id,
                          groupImage: group.groupImage
                        })}
                        onLongPress={(e)=> this.showGroup(e,group.id)}
                      />
                    ))}
                  </View>
                </View>
              </ScrollView>

            </ImageBackground>
          </SafeAreaView>
        ) : (
          <View style={{justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF'}}>
          {/* <Text style={{ textAlign: 'center'}}>Loading....</Text>
            <ActivityIndicator/>  */}
            
										<Spinner
											visible={this.state.spinner}
											textContent={'Loading...'}
											textStyle={{color: 'red'}}
										/>
								
          </View>
          )}
      </View>
    )
  }
};
Dashboard.navigationOptions = {
  title: 'Dashboard',
};
export default Dashboard;
const list2 = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#FF9800', '#F44336'],
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    phonenumber: '010-3323-5984',

    linearGradientColors: ['#3F51B5', '#2196F3'],
  },
  {
    name: 'Amanda Martin',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#FFD600', '#FF9800'],
  },
  {
    name: 'Christy Thomas',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#4CAF50', '#8BC34A'],
  },
  {
    name: 'Melissa Jones',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#F44336', '#E91E63'],
  },
  {
    name: 'Christy Thomas',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#4CAF50', '#8BC34A'],
  },
  {
    name: 'Melissa Jones',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#F44336', '#E91E63'],
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    phonenumber: '010-3323-5984',
    linearGradientColors: ['#FF9800', '#F44336'],
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    phonenumber: '010-3323-5984',

    linearGradientColors: ['#3F51B5', '#2196F3'],
  },

];
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
    flex: 7,
    marginTop: 30,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    justifyContent: 'center'
  },
  middle: {
    flex: 5,
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

