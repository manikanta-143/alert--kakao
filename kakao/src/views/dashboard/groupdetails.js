// import { logo } from '../../../assets/icons/message.svg'
// import React, { Component } from 'react';
// import { ImagePicker } from 'expo';
// import Pencil from 'react-native-vector-icons/SimpleLineIcons';
// import Check from 'react-native-vector-icons/AntDesign';
// import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   ScrollView,
//   SafeAreaView,
//   ImageBackground,
//   Alert,
//   Modal,
//   TouchableHighlight,
//   Image,
//   Linking,
//   TouchableOpacity,
//   PermissionsAndroid,
//   AsyncStorage,
//   ActivityIndicator
// } from 'react-native';
// import { Constants, SMS } from 'expo';
// import { Avatar, Button, CheckBox, SearchBar, Icon, Divider } from 'react-native-elements';
// import { Font } from 'expo';
// import Icons from 'react-native-vector-icons/Ionicons';
// import Bg_Img from '../../../assets/images/Edit-Profile.png';
// import ToggleSwitch from 'toggle-switch-react-native';
// // import BottomDrawer from 'rn-bottom-drawer';
// import { BottomSheet } from 'react-native-btr';
// import { SocialIcon, Input, } from 'react-native-elements';
// import { Item, Thumbnail } from 'native-base';
// import * as _ from  'lodash';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const TAB_BAR_HEIGHT = 10;
// // const USERS = [
// //   {
// //     id: 0,
// //     name: 'Johh Smith',
// //     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
// //     value: '- 164',
// //   },
// //   {
// //     id: 1,
// //     name: 'Sarah Parker',
// //     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
// //     value: '+ 203',
// //     positive: true,
// //   },
// //   {
// //     id: 2,
// //     name: 'Paul Allen',
// //     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
// //     value: '+ 464',
// //     positive: true,
// //   },
// //   {
// //     id: 3,
// //     name: 'Terry Andrews',
// //     avatar:
// //       'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
// //     value: '- 80',
// //     positive: false,
// //   },
// //   {
// //     id: 4,
// //     name: 'Andy Vitale',
// //     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
// //     value: '- 230',
// //     positive: false,
// //   },
// // ];
// const USERS = [
//   {
//     id: 0,
//     name: 'Johh Smith',
//     // phonenumber: '+91 7386538055',
//     phonenumber: '7386538055',
//     email: 'saikrishna.m11@gmail.com',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
//     value: '- 164',
//   },
//   {
//     id: 1,
//     name: 'Sarah Parker',
//     // phonenumber: '+91 6281955079',
//     phonenumber: '6281955079',

//     email: 'sai.krishna@digimantra.com',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
//     value: '+ 203',
//     positive: true,
//   },
//   {
//     id: 2,
//     name: 'Paul Allen',
//     phonenumber: '7985614834',
//     // phonenumber: '+91 7985614834',

//     email: 'hars0596@gmail.com',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
//     value: '+ 464',
//     positive: true,
//   },
//   {
//     id: 3,
//     name: 'Terry Andrews',
//     phonenumber: '6281955079',
//     // phonenumber: '+91 6281955079',

//     email: 'hars0596@gmail.com',
//     avatar:
//       'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
//     value: '- 80',
//     positive: false,
//   },
//   {
//     id: 4,
//     name: 'Andy Vitale',
//     // phonenumber: '+91 6281955079',
//     phonenumber: '6281955079',

//     email: 'saikrishna.m11@gmail.com',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
//     value: '- 230',
//     positive: false,
//   },
// ];
// var tempCheckValues = [];

// export default class GroupDetails extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fontLoaded: false,
//       selectedValue: [],
//       visible: false,
//       checkBoxChecked: [],
//       search: '',
//       check: false,
//       modalVisible: false,
//       groupData: [],
//       nameValid: true,
//       groupName: '',
//       count: 0,
//       iconValue: false,
//       imageURI: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
//       selectedUsers: [],
//       GroupId:null,
//       token: '',
//       id:null
//     };
//   }
//   setModalVisible(visible) {
//     this.setState({ modalVisible: visible });
//   }
//   onSpeakerPhotoPress = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: false,
//       base64: true,
//     });
//     if (!result.cancelled) {
//       this.setState({
//         image: result.uri,
//         imageURI: result.uri,
//       });
//     }
//   };
//   _toggleBottomNavigationView = () => {
//     //Toggling the visibility state of the bottom sheet
//     if (this.state.selectedValue.length > 0) {
//       this.setState({ modalVisible: !this.state.modalVisible });
//     }
//     else {
//       alert('Select at least one user')
//     }
//   };

//   _loadFont = async () => {
//     await Font.loadAsync({
//       georgia: require('../../../assets/fonts/Georgia.ttf'),
//       regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
//       light: require('../../../assets/fonts/Montserrat-Light.ttf'),
//       bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
//     })
//     this.setState({ fontLoaded: true });
//   }
//   componentWillMount() {
//     this._loadFont()
//     // this._getGroupDetails();
//   };
//   componentDidMount() {
//     this._getGroupDetails();
//     this.setState({ selectedUsers: this.state.groupData.map(e => e.phonebook)})
//   }


  
  
//   _getGroupDetails = async () => {
//     var id = await this.props.navigation.state.params.Gid;
//     this.setState({GroupId: id})
//     var groupName = await this.props.navigation.state.params.groupName;
//     this.setState({ groupName })
//     var token = await AsyncStorage.getItem('STORAGE_KEY');
//     this.setState({token})
//     await fetch(`http://http://192.168.100.94:8080/mission21/groups/${id}`, {
//       method: "GET",
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }
//     }).then((response) => response.json())
//       .then((json) => {
//         this.setState({ groupData: json });
//       }).catch(error => alert('error in get request', error))
//   };

//   componentWillReceiveProps(nextProps){
//     if(!_.isEqual(nextProps.navigation, this.props.navigation)){
//       this._getGroupDetails();
//     }
//   }
//   renderContent = () => {
//     return (
//       <View style={styles.contentContainer}>
//         <Text style={styles.text}>Send Message as</Text>
//         <View style={styles.buttonContainer}>
//           <Button
//             title="ok"
//             buttonStyle={{
//               height: 33,
//               width: 120,
//               backgroundColor: '#FF4500',
//               borderRadius: 8,
//             }}
//             titleStyle={{
//               fontFamily: 'regular',
//               fontSize: 13,
//               color: 'white',
//             }}
//             onPress={() => this.props.navigation.navigate('EditGroup')}
//             underlayColor="transparent"
//           />
//           <Button
//             title="Cancle"
//             buttonStyle={{
//               height: 33,
//               width: 120,
//               backgroundColor: 'blue',
//               borderRadius: 15,
//             }}
//             titleStyle={{
//               fontFamily: 'regular',
//               fontSize: 13,
//               color: 'white',
//             }}
//             onPress={() => {
//               this.setModalVisible(!this.state.modalVisible);
//             }}
//             underlayColor="transparent"
//           />
//         </View>
//       </View>
//     )
//   }
//   checkBoxChanged(id, value, user) {
//     const { checkBoxChecked, selectedValue } = this.state;
//     var tempCheckBoxChecked = checkBoxChecked;
//     tempCheckBoxChecked[id] = !value;
//     this.setState({ checkBoxChecked: tempCheckBoxChecked }, () => console.log(this.state.checkBoxChecked));
//     if (value) {
//       var index = selectedValue.findIndex(function (o) {
//         return o.phoneMemberId === id;
//       })
//       if (index !== -1) selectedValue.splice(index, 1);
//     } else {
//       this.setState({ selectedValue: [...selectedValue, user] })
//     }
//   }

//   renderCard(user, index) {
//     const { group, avatar, phonebook, email } = user;
//     { tempCheckValues[user.phoneMemberId] = false }
//     return (
//       <View
//         key={user.phoneMemberId}

//         style={{
//           height: 60,
//           marginHorizontal: 20,
//           marginTop: 10,
//           backgroundColor: 'white',
//           borderRadius: 5,
//           alignItems: 'center',
//           flexDirection: 'row',
//         }}
//       >
//         <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }} >
//           <View style={{ marginLeft: 15 }}>
//             <Avatar
//               small
//               rounded
//               title={phonebook.name[0]}
//               source={{
//                 uri: phonebook.photourl,
//               }}
//               activeOpacity={0.95}
//               onPress={() => this.props.navigation.navigate('EditProfile')}
//               onLongPress={(e)=> this.showContact(e,user.phoneMemberId)}
//             />
//           </View>
//           <View style={{ flexDirection: 'column' }}>
//             <Text
//               style={{
//                 fontFamily: 'regular',
//                 fontSize: 15,
//                 marginLeft: 10,
//                 color: 'gray',
//               }}
//             >
//               {phonebook.name}
//             </Text>
//             <Text style={{
//               fontFamily: 'regular',
//               fontSize: 15,
//               marginLeft: 10,
//               color: 'gray',
//             }}>
//               {phonebook.phoneNumber}
//             </Text>
//           </View>
//         </View>
//         <View style={{
//           flexDirection: 'row',
//           justifyContent: 'center',
//           marginRight: 10,
//         }}
//         >
//           {/* iconType="font-awesome"
//                         checkedIcon="check-circle"
//                         checkedColor="#FF4500"
//                         uncheckedColor="#ebebeb"
//                         uncheckedIcon="check-circle"
//               checked={this.state.visible} */}
//           <CheckBox
//             key={user.phoneMemberId}
//             iconType="font-awesome"
//             checkedIcon="check-circle"
//             checkedColor="#FF4500"
//             uncheckedColor="#ebebeb"
//             uncheckedIcon="check-circle"
//             // style={styles.checkbox}
//             // checked={this.state.visible || this.state.check}
//             checked={this.state.checkBoxChecked[user.phoneMemberId] || this.state.visible}
//             // && this.state.value}
//             onPress={() => this.checkBoxChanged(user.phoneMemberId, this.state.checkBoxChecked[user.phoneMemberId], user)}
//           />
//         </View>
//       </View>
//     );
//   }
//   renderListCards() {
    
//     return _.map(this.state.groupData, (user, index) => {
     
//       return this.renderCard(user, index);
//     });

//   }
 
//   toggleSelectAll() {
//     this.setState({ visible: !this.state.visible }, () => {
//       if (!this.state.visible) {
//         console.log('here');
//         this.setState({ selectedValue: [], checkBoxChecked: [] });
//       } else {
//         this.state.groupData.forEach(user => {
//           return tempCheckValues[user.phoneMemberId] = false && this.checkBoxChanged(user.phoneMemberId, this.state.checkBoxChecked[user.phoneMemberId], user)
//         })
//       }
//     });
//   }
//  changeState = () =>{
//    this.setState({ iconValue : !this.state.iconValue})
//  }

//  _contact = null;

//   setContactRef = ref => {
//     this._contact = ref
//   };

//   showContact = (e,id) => {
//     this._contact.show()
//     this.setState({id})
//     console.log('show contact id is',id)
//   };

//   hideContact = () => {
//     this._contact.hide()
//   };

//  DeleteUser = async() =>{
//   var Gid = await this.props.navigation.state.params.Gid;
//   var token = await AsyncStorage.getItem('STORAGE_KEY');
//   await this.hideContact()
//   await fetch(`http://http://192.168.100.94:8080/mission21/groups/remove`, {
//     method: "DELETE",
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       groupId: Gid,
//       phoneMemberId : this.state.id
//     })
//   })
//     .then(() => alert('User deleted successfully'),
//     this._getGroupDetails()
//     )
//     .catch((err) => alert(err))
//     .done();
//   }
//  updateGroupName = async() =>{
//    const {groupName} = this.state;
//    const nameValid = this.validateName();
//    var id = await this.props.navigation.state.params.Gid;
//     var token = await AsyncStorage.getItem('STORAGE_KEY');
//     if(nameValid)
//     {
//     await fetch(`http://http://192.168.100.94:8080/mission21/groups`, {
//       method: "PUT",
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         groupId: id,
//         groupName
//       })
//     })
//       .then(() =>
//        alert('Group Name Updated successfully'),
//        this.setState({ iconValue : !this.state.iconValue})
//       )
//       .catch((err) => alert(err))
//       .done();
//   }
//  }
//   sendGmail = async () => {
//     const status = await Linking.openURL(`mailto:${this.state.selectedValue.map(e => e.phonebook.email)}?subject=Testing&body=You up testing multiple email auth`).done();
//     if (status) {
//       this.props.navigation.navigate('Dashboard');
//     }
//     console.log(status);
//   }
//   sendMessage = async () => {
//     const { selectedValue } = this.state;

//     console.log(selectedValue.map(e => e.phonebook.phoneNumber), 'send message', typeof (JSON.stringify(selectedValue.map(e => e.phonebook.phoneNumber))))
//     if (await SMS.isAvailableAsync()) {
//       <ActivityIndicator />
//     }
//     const status = SMS.sendSMSAsync(
//       // USERS.map(e => e.phonenumber),

//       selectedValue.map(e => JSON.stringify(e.phonebook.phoneNumber)),
//       'you up testing for mulitpeople?'
//     ).catch(err => {
//       alert(err);
//       console.log(err);
//     }).done();
//     if (status) {
//       this.props.navigation.navigate('Dashboard');
//     }
//     console.log(status);
//   };
//   changeName = (name) => {
//     this.setState({
//         groupName: name
//     });
//   }
//   validateName = () => {
//     const { name } = this.state.groupName;
//     const nameRegx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
//     const nameValid = nameRegx.test(name);
//     this.setState({ nameValid });
//     nameValid || this.nameInput.shake();
//     return nameValid;
// }
  
//   render() {
//     console.log('array size', this.state.groupData.length);
  
//     const { visible, groupName, avatar ,groupData,nameValid} = this.state;
//     // console.log(this.state.groupData.map(e => e.phonebook));
//     console.log('final selected data', this.state.selectedUsers);
//     return (
//       <View style={{ flex: 1, backgroundColor: 'black', }}>
//         {this.state.fontLoaded ? (
//           <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }} >
//             <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
//               {/* <View style={styles.statusBar} /> */}
//               <View style={styles.statusBar} />
//               <View style={styles.navBar}>
//                 <View style={styles.container}>
//                   <View style={styles.left}>
//                     <Icon
//                       name="angle-left"
//                       size={30}
//                       type="font-awesome"
//                       iconStyle={{ color: "#ebebeb", marginLeft: 20 }}
//                       onPress={() => this.props.navigation.goBack()}
//                     //   onPress={() => navigation.navigate('DrawerOpen')}
//                     />
//                   </View>
//                   <View style={styles.middle}>
//                     <Text style={styles.nameHeader}>Group Details</Text>
//                   </View>
//                   <View style={styles.right}>
//                     <Icon
//                       name="ellipsis-v"
//                       size={30}
//                       type="font-awesome"
//                       iconStyle={{ color: "#ebebeb" }}
//                       onPress={() => console.log('threee dots')}
//                     // onPress={() => this.props.navigation.goBack()}
//                     // onPress={() => navigation.navigate('DrawerOpen')}
//                     />
//                   </View>
//                 </View>
//               </View>
//               {/* <View style={styles.navBar}>
//               <Text style={styles.nameHeader}>Growing</Text>
//             </View> */}
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   backgroundColor: 'white',
//                   borderColor: 'transparent',
//                   borderRadius: 22,
//                   alignItems: 'center',
//                   marginHorizontal: 30,
//                   height: 220,
//                   marginTop: 20,
//                   marginBottom: 10,
//                   // flex: 3
//                 }}
//               >
//                 <View
//                   style={{
//                     flex: 1,
                   
//                     flexDirection: 'row'
//                   }}
//                 >
//                   <TouchableOpacity medium primary style={{...styles.imageThumbnail, marginLeft: 5}} onPress={this.onSpeakerPhotoPress.bind(this)}>
//                     <Thumbnail circle large source={{
//                       uri: this.state.imageURI
//                     }} style={styles.lectureThumbnail} />
//                   </TouchableOpacity>
//                   {/* <Avatar
//                                         width={110}
//                                         height={110}
//                                         source={{
//                                             uri:this.state.imageURI
//                                                 // 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
//                                         }}
//                                         activeOpacity={0.7}
//                                         avatarStyle={{ borderRadius: 100 / 2 }}
//                                         overlayContainerStyle={{ backgroundColor: 'transparent' }}
//                                         onPress={this.onSpeakerPhotoPress.bind(this)}
//                                     /> */}
//                   {/* <Item style={styles.loginInput} > */}
//                   {/* <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                     */}
//                     {
//                       !this.state.iconValue ? (
//                         <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//                          <Text style={{justifyContent: 'center', alignItems: 'center', flex: 1, fontSize: 20}}>{groupName}</Text> 
//                         <Pencil 
//                         active 
//                         name="pencil"
//                         color="#FF4500"
//                          size={25} 
//                          iconStyle={{ marginTop: 10, marginRight: 5, flex: 1,alignItems:'flex-end',justifyContent: 'flex-end' }}
//                         onPress={this.changeState}
//                         //  onPress={this.setState({ icon: !this.state.icon })}
//                           />
//                           </View>
//                       ) : (
//                         <View style={{ flex: 2, flexDirection: 'row' ,justifyContent: 'space-around', alignItems: 'center'}}>
//                         <Input
//                         name="name"
//                         maxLength={25}
//                         placeholder="Type group subject.."
//                         placeholderTextColor="gray"
//                         onChangeText={(name) => this.changeName(name)}
//                         value={groupName}
//                         onSubmitEditing={() => {
//                           this.validateName();
//                           this.updateGroupName();
//                         }}
//                         inputContainerStyle={styles.inputContainer}
//                         inputStyle={styles.inputStyle}
//                         ref={input => (this.nameInput = input)}
//                         autoCapitalize="none"
//                         keyboardAppearance="dark"
//                         keyboardType="name-phone-pad"
//                         returnKeyType="next"
//                         errorMessage={
//                             nameValid ? null : 'Enter valid Name'
//                         }
//                         errorStyle={styles.errorInputStyle}
//                         autoCorrect={false}
//                         blurOnSubmit={false}
//                         autoFocus={false}
//                       />
//                       <Check
//                         rounded
//                         style={{ marginTop: 10, marginRight: 20 }}
//                         color="#FF4500" 
//                         name="checkcircle" 
//                         size={35}
//                         // iconStyle
//                         onPress={this.updateGroupName}
//                         containerStyle={{marginLeft: 20, }}
//                         iconStyle={{ marginTop: 10, marginLeft: 20, flex: 1,alignItems:'flex-end',justifyContent: 'flex-end' }}
//                       />
//                           </View>
//                         )
//                     }
//                   {/* </View> */}

//                 </View>
//                 <View
//                   style={{
//                     width: 300,
//                     borderWidth: 0.5,
//                     borderColor: 'rgba(222, 223, 226, 1)',
//                     marginHorizontal: 20,
//                     height: 1,
//                     marginTop: 5
//                   }}
//                 />
//                 <View style={{ backgroundColor: 'white' }}>
//                   <SearchBar
//                     round
//                     containerStyle={{ backgroundColor: 'white' }}
//                     platform="ios"
//                     showLoading={false}
//                     placeholder="Search here..."
//                     value={this.state.search}
//                   // {...dummySearchBarProps}
//                   />
//                 </View>

//                 <View style={{ flexDirection: 'row', alignContent: 'center' ,justifyContent: 'center'}}
               
//                 >
//                   <Text style={{ color: 'green' }}>{groupData.length} participant</Text>
//                   <Icon
//                     name="person-add"
//                     size={30}
//                     type="ionicons"
//                     iconStyle={{ paddingLeft: 20, color: "#FF4500" }}
//                     onPress={() => this.props.navigation.navigate('AddPeople',{
//                        Gid: this.state.GroupId
//                     })}
//                   />
//                   <Text 
//                    onPress={() => this.props.navigation.navigate('AddPeople',{
//                     Gid: this.state.GroupId
//                  })}
//                   >Add People</Text>
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
//                   <Button
//                     title="Send Message"
//                     containerStyle={{ flex: -1 }}
//                     buttonStyle={{ width: 150, height: 35, borderRadius: 10, }}
//                     linearGradientProps={{
//                       colors: ['#FF9800', '#F44336'],
//                       start: [1, 0],
//                       end: [0.2, 0],
//                     }}
//                     titleStyle={styles.LoginButtonText}
//                     onPress={
//                       this._toggleBottomNavigationView
//                     }
//                   />
//                   <ToggleSwitch
//                     isOn={!visible}
//                     label={!visible ? "select all" : "clear all"}
//                     labelStyle={{ fontSize: 15, borderRadius: 15, marginTop: -10 }}
//                     onColor='#ebebeb'
//                     offColor='#FF4500'
//                     size='medium'
//                     onToggle={() => this.toggleSelectAll()}
//                   />
//                 </View>

//                 {/* <View
//                   style={{
//                     flex: 1,
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                   }}
//                 >
                  
//                 </View> */}
//               </View>
//               <ScrollView style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
//               <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
//                   <Menu
//                     ref={this.setContactRef}
//                     button={<Text onPress={this.showContact}></Text>}
//                   >
//                     <MenuItem
//                      onPress={()=> Alert.alert('Selected Element was deleted')}
                     
//                      >Edit</MenuItem>
//                     <MenuDivider />
//                     <MenuItem onPress={this.DeleteUser}>Delete</MenuItem>
//                     <MenuDivider />
//                     <MenuItem onPress={this.hideContact}>Share</MenuItem>
//                     <MenuDivider />
//                     <MenuItem onPress={this.hideContact}>Create shortcut</MenuItem>
//                   </Menu>
//                 </View>
//                 {this.renderListCards()}
//               </ScrollView>
//               <BottomSheet
//                 visible={this.state.modalVisible}
//                 onBackButtonPress={this._toggleBottomNavigationView}
//                 onBackdropPress={this._toggleBottomNavigationView}
//               >
//                 {/*Bottom Sheet inner View*/}
//                 <View style={styles.bottomNavigationView}>
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: 'column',
//                       justifyContent: 'space-between',
//                     }}>
//                     <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
//                       send using
//                     </Text>
//                     <View
//                       style={{
//                         flex: 1,
//                         flexDirection: 'column',
//                         justifyContent: 'space-between',
//                       }}>
//                       <View style={{ flex: 1, flexDirection: 'row' }}>
//                         <TouchableOpacity onPress={this.sendGmail}>
//                           <View style={{ flexDirection: 'column', margin: 30 }}>
//                             <Image
//                               source={require('../../../assets/icons/gmail.png')}
//                               style={{
//                                 width: 50,
//                                 height: 50,
//                                 borderRadius: 50 / 2,
//                               }}
//                             />
//                             {/* <Button onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
//                                 title="support@example.com" /> */}
//                             <Text style={{ textAlign: 'center' }}
//                             //  onPress={() => Linking.openURL(`mailto:${this.state.selectedValue.map(e => e.email)}?subject=Testing&body=You up testing multiple email auth`)}
//                             //  onPress=  {()=>Alert.alert("Send through email")}
//                             >Gmail</Text>
//                           </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={this.sendMessage}>
//                           <View style={{ flexDirection: 'column', margin: 30 }} onPress={() => alert("send through default message app")} >
//                             <Image
//                               source={require('../../../assets/icons/message.png')}
//                               style={{
//                                 width: 50,
//                                 height: 50,
//                                 borderRadius: 50 / 2,
//                               }}
//                             />
//                             <Text style={{ textAlign: 'center' }} >Message</Text>
//                           </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => console.log('kakao')}>
//                           <View style={{ flexDirection: 'column', margin: 30 }}>
//                             <Image
//                               source={require('../../../assets/icons/kakao.png')}
//                               style={{
//                                 width: 50,
//                                 height: 50,
//                                 borderRadius: 50 / 2,
//                               }}
//                             />
//                             <Text style={{ textAlign: 'center' }}>kakao</Text>
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </BottomSheet>
//               {/* <Image source={require('../../assets/icons/message.svg')} /> */}
//             </ImageBackground>
//           </SafeAreaView>
//         ) : (
//             <Text>Loading...</Text>
//           )}
//       </View>
//     );
//   }
// }
// const dummySearchBarProps = {
//   showLoading: true,
//   onFocus: () => console.log('focus'),
//   onBlur: () => console.log('blur'),
//   onCancel: () => console.log('cancel'),
//   onClearText: () => console.log('cleared'),
//   onChangeText: text => console.log('text:', text),
// };

// const styles = StyleSheet.create({
//   statusBar: {
//     height: 10
//   },
//   navBar: {
//     height: 60,
//     width: screenWidth,
//     justifyContent: 'center',
//     alignContent: 'center'
//   },
//   container: {
//     flex: 7,
//     marginTop: 30,
//     flexDirection: 'row'
//   },
//   nameHeader: {
//     color: '#ebebeb',
//     fontSize: 20,
//     fontFamily: 'bold',
//   },
//   inputContainer: {
//     // // paddingLeft: 8,
//     // // borderRadius: 40,
//     // // borderWidth: 1,
//     // borderColor: '#e77609',
//     // // height: 45,
//     // marginTop: 5,
//     width: 180,
//   },
//   left: {
//     flex: 1,
//     marginLeft: 10,
//     justifyContent: 'flex-start'
//   },
//   middle: {
//     flex: 5,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   right: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   errorInputStyle: {
//     marginTop: 0,
//     alignContent: 'flex-start',
//     marginLeft: 15,
//     color: '#F44336',
// },
// inputStyle: {
//   // flex: 1,
//   justifyContent: 'center', alignItems: 'center', flex: 1, fontSize: 20,
  
//   color: 'black',
//   // width: 50,

// },
//   backgroundContainer: {
//     flex: 1,
//     width: screenWidth,
//     height: null,
//     alignContent: 'space-between'
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderRadius: 20,
//     borderColor: '#FF4500',
//     backgroundColor: 'gray',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   text: {
//     paddingHorizontal: 5,
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#ebebeb'
//   },
//   bottomNavigationView: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     width: '100%',
//     height: 250,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   LoginButtonText: {
//     alignContent: 'center'
//   }
// });


import { logo } from '../../../assets/icons/message.svg'
import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import Pencil from 'react-native-vector-icons/SimpleLineIcons';
import Check from 'react-native-vector-icons/AntDesign';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
  Linking,
  TouchableOpacity,
  PermissionsAndroid,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { Constants, SMS } from 'expo';
import { Avatar, Button, CheckBox, SearchBar, Icon, Divider } from 'react-native-elements';
import { Font } from 'expo';
import Icons from 'react-native-vector-icons/Ionicons';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
import ToggleSwitch from 'toggle-switch-react-native';
// import BottomDrawer from 'rn-bottom-drawer';
import { BottomSheet } from 'react-native-btr';
import { SocialIcon, Input, } from 'react-native-elements';
import { Item, Thumbnail } from 'native-base';
import * as _ from  'lodash';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TAB_BAR_HEIGHT = 10;
// const USERS = [
//   {
//     id: 0,
//     name: 'Johh Smith',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
//     value: '- 164',
//   },
//   {
//     id: 1,
//     name: 'Sarah Parker',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
//     value: '+ 203',
//     positive: true,
//   },
//   {
//     id: 2,
//     name: 'Paul Allen',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
//     value: '+ 464',
//     positive: true,
//   },
//   {
//     id: 3,
//     name: 'Terry Andrews',
//     avatar:
//       'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
//     value: '- 80',
//     positive: false,
//   },
//   {
//     id: 4,
//     name: 'Andy Vitale',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
//     value: '- 230',
//     positive: false,
//   },
// ];
const USERS = [
  {
    id: 0,
    name: 'Johh Smith',
    // phonenumber: '+91 7386538055',
    phonenumber: '7386538055',
    email: 'saikrishna.m11@gmail.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    value: '- 164',
  },
  {
    id: 1,
    name: 'Sarah Parker',
    // phonenumber: '+91 6281955079',
    phonenumber: '6281955079',

    email: 'sai.krishna@digimantra.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    value: '+ 203',
    positive: true,
  },
  {
    id: 2,
    name: 'Paul Allen',
    phonenumber: '7985614834',
    // phonenumber: '+91 7985614834',

    email: 'hars0596@gmail.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    value: '+ 464',
    positive: true,
  },
  {
    id: 3,
    name: 'Terry Andrews',
    phonenumber: '6281955079',
    // phonenumber: '+91 6281955079',

    email: 'hars0596@gmail.com',
    avatar:
      'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    value: '- 80',
    positive: false,
  },
  {
    id: 4,
    name: 'Andy Vitale',
    // phonenumber: '+91 6281955079',
    phonenumber: '6281955079',

    email: 'saikrishna.m11@gmail.com',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    value: '- 230',
    positive: false,
  },
];
var tempCheckValues = [];

export default class GroupDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      selectedValue: [],
      visible: false,
      checkBoxChecked: [],
      search: '',
      check: false,
      modalVisible: false,
      groupData: [],
      nameValid: true,
      groupName: '',
      count: 0,
      iconValue: false,
      imageURI: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
      selectedUsers: [],
      GroupId:null,
      token: '',
      id:null,
      name:''
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onSpeakerPhotoPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        imageURI: result.uri,
      });
    }
  };
  _toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    if (this.state.selectedValue.length > 0) {
      this.setState({ modalVisible: !this.state.modalVisible });
    }
    else {
      alert('Select at least one user')
    }
  };

  _loadFont = async () => {
    await Font.loadAsync({
      georgia: require('../../../assets/fonts/Georgia.ttf'),
      regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    })
    this.setState({ fontLoaded: true });
  }
  componentWillMount() {
    this._loadFont()
    // this._getGroupDetails();
  };
  componentDidMount() {
    this._getGroupDetails();
    this.setState({ selectedUsers: this.state.groupData.map(e => e.phonebook)})
  }
  // componentDidUpdate(){
  //   this._getGroupDetails();
  // }
  
  _getGroupDetails = async () => {
    var id = await this.props.navigation.state.params.Gid;
    this.setState({GroupId: id})
    var groupName = await this.props.navigation.state.params.groupName;
    this.setState({ groupName })
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    this.setState({token})
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups/${id}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((json) => {
        this.setState({ groupData: json });
      }).catch(error => alert('error in get request', error))
  };

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(nextProps.navigation, this.props.navigation)){
      this._getGroupDetails();
    }
  }
  renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Send Message as</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="ok"
            buttonStyle={{
              height: 33,
              width: 120,
              backgroundColor: '#FF4500',
              borderRadius: 8,
            }}
            titleStyle={{
              fontFamily: 'regular',
              fontSize: 13,
              color: 'white',
            }}
            onPress={() => this.props.navigation.navigate('EditGroup')}
            underlayColor="transparent"
          />
          <Button
            title="Cancle"
            buttonStyle={{
              height: 33,
              width: 120,
              backgroundColor: 'blue',
              borderRadius: 15,
            }}
            titleStyle={{
              fontFamily: 'regular',
              fontSize: 13,
              color: 'white',
            }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
            underlayColor="transparent"
          />
        </View>
      </View>
    )
  }
  checkBoxChanged(id, value, user) {
    const { checkBoxChecked, selectedValue } = this.state;
    var tempCheckBoxChecked = checkBoxChecked;
    tempCheckBoxChecked[id] = !value;
    this.setState({ checkBoxChecked: tempCheckBoxChecked }, () => console.log(this.state.checkBoxChecked));
    if (value) {
      var index = selectedValue.findIndex(function (o) {
        return o.phoneMemberId === id;
      })
      if (index !== -1) selectedValue.splice(index, 1);
    } else {
      this.setState({ selectedValue: [...selectedValue, user] })
    }
  }

  renderCard(user, index) {
    const { group, avatar, phonebook, email } = user;
    { tempCheckValues[user.phoneMemberId] = false }
    return (
      <View
        key={user.phoneMemberId}

        style={{
          height: 60,
          marginHorizontal: 20,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }} >
          <View style={{ marginLeft: 15 }}>
            <Avatar
              small
              rounded
              title={phonebook.name[0]}
              source={{
                uri: phonebook.photourl,
              }}
              activeOpacity={0.95}
              onPress={() => this.props.navigation.navigate('EditProfile')}
              onLongPress={(e)=> this.showContact(e,user.phoneMemberId,phonebook.name)}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                fontFamily: 'regular',
                fontSize: 15,
                marginLeft: 10,
                color: 'gray',
              }}
            >
              {phonebook.name}
            </Text>
            <Text style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}>
              {phonebook.phoneNumber}
            </Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginRight: 10,
        }}
        >
          {/* iconType="font-awesome"
                        checkedIcon="check-circle"
                        checkedColor="#FF4500"
                        uncheckedColor="#ebebeb"
                        uncheckedIcon="check-circle"
              checked={this.state.visible} */}
          <CheckBox
            key={user.phoneMemberId}
            iconType="font-awesome"
            checkedIcon="check-circle"
            checkedColor="#FF4500"
            uncheckedColor="#ebebeb"
            uncheckedIcon="check-circle"
            // style={styles.checkbox}
            // checked={this.state.visible || this.state.check}
            checked={this.state.checkBoxChecked[user.phoneMemberId] || this.state.visible}
            // && this.state.value}
            onPress={() => this.checkBoxChanged(user.phoneMemberId, this.state.checkBoxChecked[user.phoneMemberId], user)}
          />
        </View>
      </View>
    );
  }
  renderListCards() {
    
    return _.map(this.state.groupData, (user, index) => {
     
      return this.renderCard(user, index);
    });

  }
 
  toggleSelectAll() {
    this.setState({ visible: !this.state.visible }, () => {
      if (!this.state.visible) {
        console.log('here');
        this.setState({ selectedValue: [], checkBoxChecked: [] });
      } else {
        this.state.groupData.map(user => {
          return tempCheckValues[user.phoneMemberId] = false && this.checkBoxChanged(user.phoneMemberId, this.state.checkBoxChecked[user.phoneMemberId], user) && this.state.checkBoxChecked[user.phoneMemberId]
        })
      }
    });
  }
 changeState = () =>{
   this.setState({ iconValue : !this.state.iconValue})
 }

 _contact = null;

  setContactRef = ref => {
    this._contact = ref
  };

  showContact = (e,id,name) => {
    this._contact.show()
    this.setState({
      id,
      name
    })
    console.log('show contact id is',id)
  };

  hideContact = () => {
    this._contact.hide()
  };

 DeleteUser = async() =>{
  var Gid = await this.props.navigation.state.params.Gid;
  var token = await AsyncStorage.getItem('STORAGE_KEY');
  await this.hideContact()
  await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups/remove`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      groupId: Gid,
      phoneMemberId : this.state.id
    })
  })
    .then(() => alert('User deleted successfully'),
    this._getGroupDetails()
    )
    .catch((err) => alert(err))
    .done();
  }
 updateGroupName = async() =>{
   const {groupName} = this.state;
   const nameValid = this.validateName();
   var id = await this.props.navigation.state.params.Gid;
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    if(nameValid)
    {
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        groupId: id,
        groupName
      })
    })
      .then(() =>
       alert('Group Name Updated successfully'),
       this.setState({ iconValue : !this.state.iconValue})
      )
      .catch((err) => alert(err))
      .done();
  }
 }
  sendGmail = async () => {
    const status = await Linking.openURL(`mailto:${this.state.selectedValue.map(e => e.phonebook.email)}?subject=Testing&body=You up testing multiple email auth`).done();
    if (status) {
      this.props.navigation.navigate('Dashboard');
    }
    console.log(status);
  }
  sendMessage = async () => {
    const { selectedValue } = this.state;

    console.log(selectedValue.map(e => e.phonebook.phoneNumber), 'send message', typeof (JSON.stringify(selectedValue.map(e => e.phonebook.phoneNumber))))
    if (await SMS.isAvailableAsync()) {
      <ActivityIndicator />
    }
    const status = SMS.sendSMSAsync(
      // USERS.map(e => e.phonenumber),

      selectedValue.map(e => JSON.stringify(e.phonebook.phoneNumber)),
      'you up testing for mulitpeople?'
    ).catch(err => {
      alert(err);
      console.log(err);
    }).done();
    if (status) {
      this.props.navigation.navigate('Dashboard');
    }
    console.log(status);
  };
  changeName = (name) => {
    this.setState({
        groupName: name
    });
  }
  validateName = () => {
    const { name } = this.state.groupName;
    const nameRegx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    const nameValid = nameRegx.test(name);
    this.setState({ nameValid });
    nameValid || this.nameInput.shake();
    return nameValid;
}
  
  render() {
    console.log('array size', this.state.groupData.length);
  
    const { visible, groupName, avatar ,groupData,nameValid} = this.state;
    // console.log(this.state.groupData.map(e => e.phonebook));
    console.log('final selected data', this.state.selectedUsers);
    return (
      <View style={{ flex: 1, backgroundColor: 'black', }}>
        {this.state.fontLoaded ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }} >
            <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
              {/* <View style={styles.statusBar} /> */}
              <View style={styles.statusBar} />
              <View style={styles.navBar}>
                <View style={styles.container}>
                  <View style={styles.left}>
                    <Icon
                      name="angle-left"
                      size={30}
                      type="font-awesome"
                      iconStyle={{ color: "#ebebeb", marginLeft: 20 }}
                      onPress={() => this.props.navigation.goBack()}
                    //   onPress={() => navigation.navigate('DrawerOpen')}
                    />
                  </View>
                  <View style={styles.middle}>
                    <Text style={styles.nameHeader}>Group Details</Text>
                  </View>
                  <View style={styles.right}>
                    <Icon
                      name="ellipsis-v"
                      size={30}
                      type="font-awesome"
                      iconStyle={{ color: "#ebebeb" }}
                      onPress={() => console.log('threee dots')}
                    // onPress={() => this.props.navigation.goBack()}
                    // onPress={() => navigation.navigate('DrawerOpen')}
                    />
                  </View>
                </View>
              </View>
              {/* <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Growing</Text>
            </View> */}
              <View
                style={{
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderColor: 'transparent',
                  borderRadius: 22,
                  alignItems: 'center',
                  marginHorizontal: 30,
                  height: 220,
                  marginTop: 20,
                  marginBottom: 10,
                  // flex: 3
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity medium primary style={styles.imageThumbnail} onPress={this.onSpeakerPhotoPress.bind(this)}>
                    <Thumbnail circle large source={{
                      uri: this.state.imageURI
                    }} style={styles.lectureThumbnail} />
                  </TouchableOpacity>
                  {/* <Avatar
                                        width={110}
                                        height={110}
                                        source={{
                                            uri:this.state.imageURI
                                                // 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
                                        }}
                                        activeOpacity={0.7}
                                        avatarStyle={{ borderRadius: 100 / 2 }}
                                        overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                        onPress={this.onSpeakerPhotoPress.bind(this)}
                                    /> */}
                  {/* <Item style={styles.loginInput} > */}
                  {/* <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    */}
                    {
                      !this.state.iconValue ? (
                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                         <Text style={{justifyContent: 'center', alignItems: 'center', flex: 1, fontSize: 20}}>{groupName}</Text> 
                        <Pencil 
                        active 
                        name="pencil"
                        color="#FF4500"
                         size={25} 
                         iconStyle={{ marginTop: 10, marginRight: 5, flex: 1,alignItems:'flex-end',justifyContent: 'flex-end' }}
                        onPress={this.changeState}
                        //  onPress={this.setState({ icon: !this.state.icon })}
                          />
                          </View>
                      ) : (
                        <View style={{ flex: 2, flexDirection: 'row' ,justifyContent: 'space-around', alignItems: 'center'}}>
                        <Input
                        name="name"
                        maxLength={25}
                        placeholder="Type group subject.."
                        placeholderTextColor="gray"
                        onChangeText={(name) => this.changeName(name)}
                        value={groupName}
                        onSubmitEditing={() => {
                          this.validateName();
                          this.updateGroupName();
                        }}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.inputStyle}
                        ref={input => (this.nameInput = input)}
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        keyboardType="name-phone-pad"
                        returnKeyType="next"
                        errorMessage={
                            nameValid ? null : 'Enter valid Name'
                        }
                        errorStyle={styles.errorInputStyle}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        autoFocus={false}
                      />
                      <Check
                        rounded
                        style={{ marginTop: 10, marginRight: 20 }}
                        color="#FF4500" 
                        name="checkcircle" 
                        size={35}
                        // iconStyle
                        onPress={this.updateGroupName}
                        containerStyle={{marginLeft: 20, }}
                        iconStyle={{ marginTop: 10, marginLeft: 20, flex: 1,alignItems:'flex-end',justifyContent: 'flex-end' }}
                      />
                          </View>
                        )
                    }
                  {/* </View> */}

                </View>
                <View
                  style={{
                    width: 300,
                    borderWidth: 0.5,
                    borderColor: 'rgba(222, 223, 226, 1)',
                    marginHorizontal: 20,
                    height: 1,
                    marginTop: 5
                  }}
                />
                <View style={{ backgroundColor: 'white' }}>
                  <SearchBar
                    round
                    containerStyle={{ backgroundColor: 'white' }}
                    platform="ios"
                    showLoading={false}
                    placeholder="Search here..."
                    value={this.state.search}
                  // {...dummySearchBarProps}
                  />
                </View>

                <View style={{ flexDirection: 'row', alignContent: 'center' ,justifyContent: 'center'}}
               
                >
                  <Text style={{ color: 'green' }}>{groupData.length} participant</Text>
                  <Icon
                    name="person-add"
                    size={30}
                    type="ionicons"
                    iconStyle={{ paddingLeft: 20, color: "#FF4500" }}
                    onPress={() => this.props.navigation.navigate('AddPeople',{
                       Gid: this.state.GroupId
                    })}
                  />
                  <Text 
                   onPress={() => this.props.navigation.navigate('AddPeople',{
                    Gid: this.state.GroupId
                 })}
                  >Add People</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Button
                    title="Send Message"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={{ width: 150, height: 35, borderRadius: 10, }}
                    linearGradientProps={{
                      colors: ['#FF9800', '#F44336'],
                      start: [1, 0],
                      end: [0.2, 0],
                    }}
                    titleStyle={styles.LoginButtonText}
                    onPress={
                      this._toggleBottomNavigationView
                    }
                  />
                  <ToggleSwitch
                    isOn={!visible}
                    label={!visible ? "select all" : "clear all"}
                    labelStyle={{ fontSize: 15, borderRadius: 15, marginTop: -10 }}
                    onColor='#ebebeb'
                    offColor='#FF4500'
                    size='medium'
                    onToggle={() => this.toggleSelectAll()}
                  />
                </View>

                {/* <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  
                </View> */}
              </View>
              <ScrollView style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
              <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Menu
                    ref={this.setContactRef}
                    button={<Text onPress={this.showContact}></Text>}
                  >
                    <MenuItem
                     onPress={()=> Alert.alert('Selected Element was deleted')}
                     
                     >Edit</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.DeleteUser}>Remove <Text>{this.state.name}</Text></MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideContact}>Share</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.hideContact}>Create shortcut</MenuItem>
                  </Menu>
                </View>
                {this.renderListCards()}
              </ScrollView>
              <BottomSheet
                visible={this.state.modalVisible}
                onBackButtonPress={this._toggleBottomNavigationView}
                onBackdropPress={this._toggleBottomNavigationView}
              >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                      send using
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.sendGmail}>
                          <View style={{ flexDirection: 'column', margin: 30 }}>
                            <Image
                              source={require('../../../assets/icons/gmail.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            {/* <Button onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
                                title="support@example.com" /> */}
                            <Text style={{ textAlign: 'center' }}
                            //  onPress={() => Linking.openURL(`mailto:${this.state.selectedValue.map(e => e.email)}?subject=Testing&body=You up testing multiple email auth`)}
                            //  onPress=  {()=>Alert.alert("Send through email")}
                            >Gmail</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.sendMessage}>
                          <View style={{ flexDirection: 'column', margin: 30 }} onPress={() => alert("send through default message app")} >
                            <Image
                              source={require('../../../assets/icons/message.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            <Text style={{ textAlign: 'center' }} >Message</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('kakao')}>
                          <View style={{ flexDirection: 'column', margin: 30 }}>
                            <Image
                              source={require('../../../assets/icons/kakao.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            <Text style={{ textAlign: 'center' }}>kakao</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </BottomSheet>
              {/* <Image source={require('../../assets/icons/message.svg')} /> */}
            </ImageBackground>
          </SafeAreaView>
        ) : (
            <Text>Loading...</Text>
          )}
      </View>
    );
  }
}
const dummySearchBarProps = {
  showLoading: true,
  onFocus: () => console.log('focus'),
  onBlur: () => console.log('blur'),
  onCancel: () => console.log('cancel'),
  onClearText: () => console.log('cleared'),
  onChangeText: text => console.log('text:', text),
};

const styles = StyleSheet.create({
  statusBar: {
    height: 10
  },
  navBar: {
    height: 60,
    width: screenWidth,
    justifyContent: 'center',
    alignContent: 'center'
  },
  container: {
    flex: 7,
    marginTop: 30,
    flexDirection: 'row'
  },
  nameHeader: {
    color: '#ebebeb',
    fontSize: 20,
    fontFamily: 'bold',
  },
  left: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-start'
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
  errorInputStyle: {
    marginTop: 0,
    alignContent: 'flex-start',
    marginLeft: 15,
    color: '#F44336',
},
  inputContainer: {
    // // paddingLeft: 8,
    // // borderRadius: 40,
    // // borderWidth: 1,
    // borderColor: '#e77609',
    // // height: 45,
    // marginTop: 5,
    width: 180,
  },
inputStyle: {
  // flex: 1,
  justifyContent: 'center', alignItems: 'center', flex: 1, fontSize: 20,
  
  color: 'black',
  // width: 50,

},
  backgroundContainer: {
    flex: 1,
    width: screenWidth,
    height: null,
    alignContent: 'space-between'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    borderColor: '#FF4500',
    backgroundColor: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ebebeb'
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginButtonText: {
    alignContent: 'center'
  }
});