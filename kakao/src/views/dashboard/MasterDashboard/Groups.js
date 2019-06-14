import React,{Component} from 'react';
import {Alert, View, StyleSheet, ScrollView, Button, SafeAreaView, ImageBackground, Dimensions, AsyncStorage,ActivityIndicator } from 'react-native';
import { Text, Icon, ListItem, SearchBar, Divider } from 'react-native-elements';
import * as _ from 'lodash';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import SweetAlert from 'react-native-sweet-alert';


const screenWidth = Dimensions.get('window').width;

class Groups extends Component{
  state={
    groups: {
        items: [],
      },
      id: null
  };
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

  // componentWillReceiveProps(nextProps) {
  //   if (!_.isEqual(nextProps.navigation, this.props.navigation)) {
  //     this._getAllGroups();
  //   }
  // }

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
   ).catch((err) => alert(err))
      .done();
    }
 componentWillMount(){
  this._getAllGroups();
}

_getAllGroups = async () => {
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups`, {
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

  render(){

    const { groups } = this.state;
    console.log('groups data',groups);
      return(
          <View style={styles.container}>
              <ScrollView>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center',marginHorizontal: 20 }}>
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
                          title: group.groupName[0]
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
                        })}
                        // onPress={()=> alert("Hello")}
                        onLongPress={(e)=> this.showGroup(e,group.id)}
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
export default Groups;