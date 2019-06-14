import React,{Component} from 'react';
import {Alert, View, StyleSheet, ScrollView, Button, SafeAreaView, ImageBackground, Dimensions, AsyncStorage,ActivityIndicator,RefreshControl } from 'react-native';
import { Text, Icon, ListItem, SearchBar, Divider } from 'react-native-elements';
import * as _ from 'lodash';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
const screenWidth = Dimensions.get('window').width;

class Users extends Component{
  state={
    users: [],
    id: null,
    reload: false
  };
  _users = null;

  setContactRef = ref => {
    this._users = ref
  };

  showGroup = (e,id) => {
    this._users.show()
    this.setState({id})
    console.log('show contact id is',id)
  };

  hideGroup = () => {
    this._users.hide()
  };

//   componentDidUpdate(){
//   this._getAllusers();
//   }

  DeleteUser = async() =>{
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    var id =  await this.state.id;
    console.log(id,'here');
    await this.hideGroup()
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/profiles/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then(() => alert('user deleted successfully',
       this._getAllusers()
      ))
      .catch((err) => alert(err))
      .done();
    }
 componentWillMount(){
  this._getAllusers();
}
 componentDidUpdate(){
  this._getAllusers();
 }
componentWillReceiveProps(nextProps) {
  if (!_.isEqual(nextProps.navigation, this.props.navigation)) {
    this._getAllusers();
  }
}
_onRefresh = () =>{
  this.setState({ reload: true});
  this._getAllusers().then(() =>{
    this.setState({ reload: false})
  })
}
_getAllusers = async () => {
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/profiles`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ users: json });
      })
      .done();
  };
 
  render(){

    const { users } = this.state;
    console.log('users data',users);
      return(
          <View style={styles.container}>
              <ScrollView 
               refreshControl={
                 <RefreshControl 
                  refreshing={this.state.reload}
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
                    <MenuItem onPress={this.DeleteUser}>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideGroup}>Share</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideGroup}>Create shortcut</MenuItem>
                  </Menu>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                  <View style={styles.list}>
                    {users.map((user, i) => (
                      <ListItem
                        leftAvatar={{
                          title: user.name[0]
                          // , source: { uri: l.userName } 
                        }}
                        key={i}
                        title={user.name}
                        subtitle={user.email}
                        chevron
                        bottomDivider
                        onPress={() => this.props.navigation.navigate('ViewProfile',{
                          Uid: user.id
                        })}
                    
                        onLongPress={(e)=> this.showGroup(e,user.id)}
                      />
                    ))}
                  </View>
                </View>
              </ScrollView>

          </View>
      );
  }
};

const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         // borderColor: 'transparent',
//         // borderRadius: 22,
//         alignItems: 'center',
//         // marginHorizontal: 30,
//         // flex: 1,
//         // backgroundColor: "red",
//         justifyContent: 'center',
//         // alignItems: 'center'
//     },
//     list: {
//         marginHorizontal: 10,
//         borderTopWidth: 1,
//         borderColor: "black",
//         backgroundColor: '#fff',
//       },
//       statusBar: {
//         height: 10
//       },
//       navBar: {
//         height: 60,
//         width: screenWidth,
//       },
    
//       left: {
//         flex: 1,
//         justifyContent: 'center'
//       },
//       middle: {
//         flex: 5,
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//       right: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//       },
//       nameHeader: {
//         color: '#ebebeb',
//         fontSize: 20,
//         fontFamily: 'bold',
//       },
//       backgroundContainer: {
//         flex: 1,
//         width: null,
//         height: null,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//       },
 });
export default Users;