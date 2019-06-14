import React from 'react';
import { TouchableOpacity, AsyncStorage, Alert, View, StyleSheet, ScrollView, Button, SafeAreaView, ImageBackground, Dimensions ,RefreshControl} from 'react-native';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
import { Font } from 'expo';
import { DrawerActions } from 'react-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {
  Text,
  Card,
  Tile,
  Icon,
  ListItem,
  Avatar,
  SearchBar,
  Divider,
  Header
} from 'react-native-elements';
// import MenuItems from '../../components/MenuItem';
import * as _ from 'lodash';

const iconb = require('../../../assets/icons/gmail.png')
const screenWidth = Dimensions.get('window').width;

class Phonebook extends React.Component {
  state = {
    fontLoaded: false,
    search: '',
    value: -1,
    token: '',
    Userdata: [],
    id: null,
    refresh : false
  }
  _menu = null;
  _contact = null;

  componentWillMount() {
    this._loadFont();
    this._getAllUsers();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return !_.isEqual(this.state.Userdata, nextState.Userdata),
  //   () => alert(!_.isEqual(this.state.Userdata, nextState.Userdata))
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (!_.isEqual(prevState.Userdata ,this.state.Userdata)){
  //   this._getAllUsers();
  //   console.log(true);
  //   }
  //  }
  componentDidUpdate(){
    this._getAllUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.navigation, this.props.navigation)) {
      this._getAllUsers();
    }
  }
  
  _getAllUsers = async () => {
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await fetch(global.createphonebook, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ Userdata: json.items });
      })
      .done();
  };

  _loadFont = async () => {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  setContactRef = ref => {
    this._contact = ref
  };

  showContact = (e,id) => {
    this._contact.show()
    this.setState({id})
    console.log('show contact id is',id)
  };

  hideContact = () => {
    this._contact.hide()
  };

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  CreatePhonebook = async () => {
    await this.hideMenu()
    await this.props.navigation.navigate('CreatePhoneBook');
  }
  EditContact = async() =>{
  await this.hideContact()
  await this.props.navigation.navigate('EditPhoneBook',{
      Uid: this.state.id
    });
  console.log('input value',this.state.id);

    // console.log('input value',this.editInput)
  }

  DeleteContact = async() =>{
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await this.hideContact()
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/phoneBook/${this.state.id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(() => alert('Phonebook member deleted successfully',
       this._getAllUsers()
      ))
      .catch((err) => alert(err))
      .done();
    }
  _onRefresh =() =>{
    this.setState({ refresh: true});
    this._getAllUsers().then(()=>{
      this.setState({ refresh: false})
    })
  }
  render() {
    console.log('users data',this.state.Userdata);
    // console.log('static list', list2);
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.fontLoaded ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ebebeb' }} >
            <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
              <View style={styles.statusBar} />
              <View style={styles.navBar}>
                <View style={styles.container}>
                  <View style={styles.left}>
                    <Icon
                      name="angle-left"
                      size={30}
                      type="font-awesome"
                      iconStyle={{ color: "#ebebeb" }}
                      onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                    // onPress={() => this.props.navigation.goBack()}
                    //   onPress={() => navigation.navigate('DrawerOpen')}
                    />
                  </View>
                  <View style={styles.middle}>
                    <Text style={styles.nameHeader}>Phonebook</Text>
                  </View>
                  <View style={styles.right}>
                    <TouchableOpacity onPress={this.showMenu}>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Menu
                          ref={this.setMenuRef}
                          button={

                            <Icon

                              name="ellipsis-v"
                              size={30}
                              type="font-awesome"
                              iconStyle={{ color: "#ebebeb" }}
                              onPress={this.showMenu}
                              containerStyle={{ padding: 20 }}
                            // onPress={() => this.props.navigation.goBack()}
                            // onPress={() => navigation.navigate('DrawerOpen')}
                            />
                          }
                        >
                          <MenuItem onPress={this.CreatePhonebook}>New contact</MenuItem>
                          <MenuDivider />
                          <MenuItem onPress={this.hideMenu}>Settings</MenuItem>
                          {/* <MenuItem onPress={this.hideMenu} disabled>
                            Menu item 3
                        </MenuItem> */}
                          <MenuDivider />
                          <MenuItem onPress={this.hideMenu}>Blocked contacts</MenuItem>
                          <MenuDivider />
                        </Menu>
                      </View>
                    </TouchableOpacity>
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
                  height: 100,
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
                   refreshing={this.state.refresh} 
                   onRefresh={this._onRefresh}
                  />
                }
              >
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Menu
                    ref={this.setContactRef}
                    button={<Text onPress={this.showContact}></Text>}
                  >
                    <MenuItem
                     onPress={this.EditContact}
                     >Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.DeleteContact}>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideContact}>Share</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideContact}>Create shortcut</MenuItem>
                  </Menu>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 20 }}>

                  <View style={styles.list}>
                    {this.state.Userdata.map((l, i) =>
                      this.state.Userdata.length > 0 ?
                        (
                          <ListItem
                            leftAvatar={{ title: l.name[0], source: { uri: l.photourl } }}
                            key={i}
                            title={l.name}
                            subtitle={JSON.stringify(l.phoneNumber)}
                            chevron
                            bottomDivider
                            // onPress ={()=> this.props.navigation.navigate('GroupDetails')}
                            // onPress={() => this.props.navigation.navigate('EditPhoneBook')}
                            onPress={() => this.props.navigation.navigate('UserViewProfile',{
                              Uid: l.id
                            })}
                            onLongPress={(e)=> this.showContact(e,l.id)}
                          />
                        ) : (<Text style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>There is no user to show</Text>)
                    )}
                    {/* {list2.map((l, i) => (
<ListItem
  leftAvatar={{ title: l.name[0], source: { uri: l.avatar_url } }}
  key={i}
  title={l.name}
  subtitle={l.phonenumber}
  chevron
  bottomDivider
  // onPress ={()=> this.props.navigation.navigate('GroupDetails')}
  onPress={() => this.props.navigation.navigate('EditPhoneBook')}
  onLongPress={this.showContact}
/>
))} */}
                  </View>
                  <View>

                  </View>

                </View>

              </ScrollView>
              {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}></Text>}
        >
          <MenuItem onPress={() => this.props.navigation.navigate('EditPhoneBook')}>Edit</MenuItem>
          <MenuDivider />

          <MenuItem onPress={() => Alert.alert('Selected Element was deleted')}>Delete</MenuItem>
          <MenuDivider />

          <MenuItem onPress={this.hideMenu}>Menu item 3</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
          </Menu>
          </View> */}
            </ImageBackground>
          </SafeAreaView>

        ) : (
            <Text style={{ textAlign: 'center'}}>Loading...</Text>
          )}
      </View>
    )
  }
};

Phonebook.navigationOptions = {
  drawerLabel: 'Phonebook',
};
export default Phonebook;

// const log = () => console.log('this is an example method');
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
    height: 10,
  },
  container: {
    flex: 7,
    flexDirection: 'row',
    marginTop: 30,

  },
  navBar: {
    height: 60,
    width: screenWidth,
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
    fontSize: 22,
    fontFamily: 'bold',
    // marginLeft: 80,
    // justifyContent: 'center',
    // alignContent: 'center'
  },
  backgroundContainer: {
    flex: 1,
    width: screenWidth,
    height: null,
    alignContent: 'space-between'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

