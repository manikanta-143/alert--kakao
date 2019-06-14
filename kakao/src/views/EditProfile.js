import React from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, ImageBackground, Dimensions, ScrollView, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'native-base';
import { Avatar, Card, ListItem, Button, Input, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Bg_Img from '../../assets/images/Edit-Profile.png';
import { ImagePicker } from 'expo';
import { DrawerActions } from 'react-navigation';
import AboutUsDrawerItem from '../drawer/aboutus';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_SIZE = SCREEN_WIDTH - 50;
const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
];

class Editprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            username: "",
            nameValid: true,
            isNameValid: false,
            phonenumberValid: true,
            isPhonenumberValid: false,
            token: '',
            userId: null,
            imageURI: 'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png'
            // 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            // 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
        };
    };
    componentWillMount() {
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
            .catch(error => alert('error in get request', error));
    }
    reset = async () => {
        const { phoneNumber, name, id } = this.state.profile;
        const nameValid = this.validateName();
        const phonenumberValid = this.validatePhonenumber();
        var token = await AsyncStorage.getItem('STORAGE_KEY');
        if (nameValid && phonenumberValid) {
            await fetch(`https://kakaonodeapp.herokuapp.com/mission21/profiles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    phoneNumber: parseFloat(phoneNumber),
                }),
            }).then(response  => response.json())
                .then(res  =>{
                    if(res.success === true){
                        setTimeout(() => {
                            alert('Profile Updated successfully'),
                                this.props.navigation.navigate('Dashboard');
                        },100)
                    }
                    else{
                        alert(res.fields);
                    }
                })
                .catch(err => alert(err))
                .done();
            // setTimeout(() => {
            //     this.setState({
            //         isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            //         isNameValid: this.validateName(name) || this.nameInput.shake(),
            //         isPhonenumberValid: this.validatePhonenumber(phonenumber) || this.phonenumberInput.shake(),
            //         isPasswordValid: password.length >= 8 || this.passwordInput.shake()
            //     });
            //     Alert.alert('Successfull');
            //     //  this.props.navigation.navigate('Main');
            //     this.props.navigation.navigate('Phonebook');
            // }, 1000)
        }
    }
    validateName = () => {
        const { name } = this.state.profile;
        const nameRegx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        const nameValid = nameRegx.test(name);
        this.setState({ nameValid });
        nameValid || this.nameInput.shake();
        return nameValid;
    }
    validatePhonenumber = () => {
        const { phoneNumber } = this.state.profile;
        const phonenumberRegx = /^(?:(?:\+|0{0,2})91(\s*\s*)?|[0]?)?[6789]\d{9}$/;
        const phonenumberValid = phonenumberRegx.test(parseFloat(phoneNumber));
        this.setState({ phonenumberValid });
        phonenumberValid || this.phonenumberInput.shake();
        return phonenumberValid;
    }
    onPhotoPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
        });
        if (!result.cancelled) {
            this.setState({
                profile: {
                    ...this.state.profile,
                    photoUrl: result.uri,
                }
            });
        }
    }
    changeName = (name) => {
        this.setState({
            profile: {
                ...this.state.profile,
                name,
            }
        });
    }
    changePhone = (phoneNumber) => {
        this.setState({
            profile: {
                ...this.state.profile,
                phoneNumber
            }
        });
    }
    render() {
        const { nameValid, phonenumberValid, profile } = this.state;
        console.log(profile);
        return (
            <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    {/* <View style={styles.pageTitle}>
                    <View style={styles.left}>
                        <Icon
                            name="angle-left"
                            size={30}
                            type="font-awesome"
                            iconStyle={{ color: "#ebebeb" }}
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                            onPress={() => this.props.navigation.goBack()}
                            onPress={() => navigation.navigate('DrawerOpen')}
                        />
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.title}>User Profile</Text>
                    </View>
                </View> */}
                    <View style={styles.statusBar} />
                    <View style={styles.navBar}>
                        <View style={styles.pageTitle}>
                            <View style={styles.left}>
                                <Icon
                                    name="angle-left"
                                    size={30}
                                    type="font-awesome"
                                    iconStyle={{ color: "#ebebeb" }}
                                    onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                                />
                            </View>
                            <View style={styles.middle}>
                                <Text style={styles.nameHeader}>Edit Profile</Text>
                            </View>
                            <View style={styles.right}></View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag'>
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: 'center',
                                marginTop: -5, marginBottom: 20,

                            }}>
                                {/* https://snack.expo.io/rJX-kHdIz */}
                                <Card
                                    containerStyle={{
                                        borderRadius: 22,
                                        width: CARD_SIZE,
                                        borderColor: '#FFF',
                                        backgroundColor: '#FFF',
                                        shadowColor: 'white',
                                        height: null,
                                        flex: 6,
                                        elevation: 0,
                                        shadowOpacity: 0
                                        // borderColor: 'transparent' ,
                                    }}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Profile</Text>
                                    <View style={{ alignItems: 'flex-end', marginTop: -25, marginRight: 5 }}>
                                        <Icons onPress={() => this.props.navigation.navigate('Dashboard')} color="gray" name="close" size={20} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                        <Avatar
                                            small
                                            rounded
                                            // title={this.state.name[0]}
                                            source={{
                                                uri: profile.photoUrl || 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                                            }}
                                            onPress={this.onPhotoPress.bind(this)}
                                            activeOpacity={0.7}
                                            width={100}
                                            height={100}
                                            containerStyle={{ borderWidth: 2, borderColor: '#CCC', padding: 5, borderRadius: 100 / 2, width: 100, height: 100 }}
                                            // containerStyle={{margin: 10}}
                                            avatarStyle={{ borderRadius: 100 / 2, }}
                                            overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                        />
                                        <Text>Profile photo</Text>
                                    </View>
                                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="user" color="gray" size={20} />
                                            <Text style={styles.textfield}>NAME</Text>
                                        </View>
                                        <Input
                                            name="name"
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="username"
                                            placeholderTextColor="gray"
                                            onChangeText={(name) => this.changeName(name)}
                                            onSubmitEditing={() => {
                                                this.validateName();
                                                this.phonenumberInput.focus();
                                            }}
                                            value={profile.name}
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
                                            ref={input => (this.nameInput = input)}
                                        />


                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="key" color="gray" size={20} />
                                            {/* name =note */}
                                            {/* name="location-pin" */}
                                            <Text style={styles.textfield}>Phonenumber</Text>
                                        </View>
                                        <Input
                                            name="phoneNumber"
                                            type="number"
                                            maxLength={10}
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="7386538559"
                                            placeholderTextColor="gray"
                                            onChangeText={(phonenumber) => this.changePhone(phonenumber)}
                                            onSubmitEditing={() => {
                                                // this.validatePhonenumber();
                                                this.reset();
                                            }}
                                            // value={profile.phoneNumber}
                                            value={String(profile.phoneNumber)}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="phone-pad"
                                            returnKeyType="next"
                                            errorMessage={
                                                phonenumberValid ? null : 'Enter 10 digits valid Phonenumber'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.phonenumberInput = input)}
                                        />
                                        <View style={{ alignItems: 'center', marginVertical: 15 }}>
                                            <Button
                                                title="SAVE"
                                                containerStyle={{ flex: -1 }}
                                                buttonStyle={styles.loginButton}
                                                linearGradientProps={{
                                                    colors: ['#FF9800', '#F44336'],
                                                    start: [1, 0],
                                                    end: [0.2, 0],
                                                }}
                                                titleStyle={styles.LoginButtonText}
                                                onPress={this.reset}
                                            />
                                        </View>
                                    </View>
                                </Card>
                                {/* </View> */}
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
};

export default Editprofile;

const styles = StyleSheet.create({
    container: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hero: {
        width: SCREEN_WIDTH - 100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: "white",

    },

    heading: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 22,
    },
    headingtext: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 13,
        marginLeft: 10
    },
    textfield: {
        color: 'black',
        paddingLeft: 10,
        // marginTop: 30,
        // marginLeft: -137,
        fontSize: 16,
        // marginLeft:10,

        fontWeight: "bold",
    },
    loginButton: {
        height: 45,
        padding: 20,
        width: 200,
        backgroundColor: '#27285b',
        // marginRight: 5, 
        // marginLeft: -15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 90
    },
    LoginButtonText: {
        fontFamily: "Georgia",
    },
    errorInputStyle: {
        marginTop: 0,
        alignContent: 'flex-start',
        marginLeft: 15,
        color: '#F44336',
    },
    inputStyle: {
        // flex: 1,
        marginLeft: -10,
        color: 'black',
        fontFamily: 'light',
        fontSize: 16,
        width: 250,

    },
    backgroundContainer: {
        flex: 7,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBar: {
        height: 10,
    },
    navBar: {
        height: 60,
        width: SCREEN_WIDTH,
    },
    pageTitle: {
        flex: 7,
        flexDirection: 'row',
        marginTop: 20,
    },
    nameHeader: {
        fontSize: 20,
        color: '#ebebeb',
        fontWeight: "bold",
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
});










// import React from 'react';
// import {Image,KeyboardAvoidingView,ImageBackground,Dimensions,ScrollView ,StyleSheet,Alert} from 'react-native';
// import {createDrawerNavigator,createAppContainer} from 'react-navigation';
// import { View ,Text} from 'native-base';
// import {Avatar,Card, ListItem, Button,Input} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import Bg_Img from '../../assets/images/Edit-Profile.png';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

// const CARD_SIZE = SCREEN_WIDTH -50;
// const users = [
//     {
//        name: 'brynn',
//        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//     },

//    ];

// class Editprofile extends React.Component {
//   static navigationOptions = {
//     drawerLabel: 'Editprofile',
//   };
//   constructor(props)
// {
//   super(props);
//   this.state={
//     email: 'developer@digimantra.com',
//     emailValid: true,
//     isEmailValid: false,

//     name: '',
//     nameValid: true,
//     isNameValid: false,

//     title: 'something about me',
//     titleValid: true,
//     isTitleValid: false,

//     location: 'Ludhiana'
//   };
// };

// reset = () =>{
//  const {email ,name , title} = this.state;
//  const emailValid = this.validateEmail();
//  const nameValid = this.validateName();
//  const titleValid = this.validateTitle();
//  if(emailValid && nameValid && titleValid){

//    setTimeout(() =>{
//      this.setState({
//       isEmailValid : this.validateEmail(email) || this.emailInput.shake(),
//       isNameValid:  this.validateName(name) || this.nameInput.shake(),
//       isTitleValid: this.validateTitle(title) || this.titleInput.shake()
//      });
//      Alert.alert('Successfull');
//     //  this.props.navigation.navigate('Main');
//      this.props.navigation.navigate('Dashboard')
//    },1000)
//  }
// }
// validateName =() =>{
//   const {name}= this.state;

//   const nameRegx= /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
//   const nameValid = nameRegx.test(name);
//   this.setState({ nameValid });
//   nameValid || this.nameInput.shake();
//   return nameValid;
// }
// validateTitle =() =>{
//   const {title}= this.state;

//   const titleRegx= /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
//   const titleValid = titleRegx.test(title);
//   this.setState({ titleValid });
//   titleValid || this.titleInput.shake();
//   return titleValid;
// }



// validateEmail =() =>{
//   const {email}= this.state;
//   const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const emailValid = emailRegx.test(email);
//   this.setState({ emailValid });
//   emailValid || this.emailInput.shake();
//   return emailValid;
// }

//   render() {
//   const {emailValid ,nameValid , titleValid}= this.state;

//     return (
//       <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
//           <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//              <View style={styles.container}>
//              <View style={styles.pageTitle}>
//                      <View>
//                        <Text style={styles.title}>Edit Profile</Text>
//                      </View>
//              </View>
//         <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag'>
//       <View style={{flex: 1,
//          justifyContent: "center",
//          alignItems:'center', 
//          marginTop: 0, marginBottom:  20 ,

//            }}>

//       {/* <Image 
//         source={{
//             uri:
//               'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
//           }}
//           style={{
//             width: IMAGE_SIZE,
//             height: IMAGE_SIZE,
//             borderRadius: 10,
//           }}
//       /> */}
//        {/* <Avatar 
//         small
//         rounded
//         source={{
//             uri:
//               'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
//           }}
//           activeOpacity={0.7}
//           width={145}
//           height={145}
//           avatarStyle={{ borderRadius: 145 / 2 }}
//           overlayContainerStyle={{ backgroundColor: 'transparent'}}
//        />
//        <Text>Profile photo</Text> */}




// {/* <View  style={{
//     width: SCREEN_WIDTH -20,
//     height: SCREEN_HEIGHT -20,
//     borderRadius: 10,
//   }}> */}

// {/* https://snack.expo.io/rJX-kHdIz */}
// <Card

// containerStyle={{ 
//   borderRadius: 22,
//   width: CARD_SIZE,
//   borderColor: '#FFF',
//   backgroundColor: '#FFF',
//   shadowColor:'white',
//     height: null,
//     elevation: 0,
//     shadowOpacity: 0
//     // borderColor: 'transparent' ,
//   }}

// //   title='HELLO WORLD'

// //   image={require('../assets/images/wall2.jpg')}
//   >

//   <Text style={{fontWeight :'bold' ,fontSize: 20}}>Edit Profile</Text>
//   <View style={{ alignItems: 'flex-end',marginTop:-25,marginRight:5}}>
//         <Icon onPress={() => console.log("icon pressed")} color="gray" name="close" size={20} />
//         </View>
//   <View style={{flex: 1, justifyContent: "center",alignItems:'center',marginTop : 20}}>

//   <Avatar 
//         small
//         rounded
//         source={{
//             uri:
//               'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
//           }}
//           activeOpacity={0.7}
//           width={100}
//           height={100}
//           containerStyle={{ borderWidth:2,borderColor: '#CCC',padding: 5,borderRadius: 100 / 2,}}
//           // containerStyle={{margin: 10}}
//           avatarStyle={{ borderRadius: 100 / 2,}}
//           overlayContainerStyle={{ backgroundColor: 'transparent'}}
//        />
//        <Text>Profile photo</Text>
//     </View>    

//        <View style={{marginBottom: 20,marginTop : 15}}>

//              <View style={{flex:1, flexDirection: 'row' ,marginTop: 10  }}>
//              <Icon active name="user" color ="gray" size={20} />
//              <Text style={styles.textfield}>NAME</Text>
//              </View>
//                            <Input  
//                             inputContainerStyle={{borderColor: '#e77609', marginLeft: 20}}
//                              placeholder="username"
//                              placeholderTextColor="#e77609"
//                              onChangeText ={(name) => this.setState({name})}
//                              onSubmitEditing ={() =>{
//                               this.validateName();
//                               this.emailInput.focus();
//                             }}
//                              value={this.state.name}
//                              autoCapitalize="none"
//                              keyboardAppearance="dark"
//                              keyboardType="name-phone-pad"
//                              returnKeyType="next"
//                              errorMessage ={
//                               nameValid ? null : 'Enter valid Name'
//                             }
//                              errorStyle={styles.errorInputStyle}
//                              autoCorrect={false}
//                              blurOnSubmit={false}
//                              autoFocus ={false}
//                              ref={ input => (this.nameInput = input)}
//                             />
//            <View style={{flex:1, flexDirection: 'row'  ,marginTop: 10  }}>
//              <Icon active name="envelope" color ="gray" size={20} />
//              <Text style={styles.textfield}>EMAIL</Text>
//              </View>
//                            <Input
//                              inputContainerStyle={{borderColor: '#e77609', marginLeft: 20}}
//                              placeholder="username@domain.com"
//                              placeholderTextColor="#e77609"
//                              onChangeText ={(email) => this.setState({email})}
//                              onSubmitEditing ={() =>{
//                               this.validateEmail();
//                               this.titleInput.focus();
//                             }}
//                              value={this.state.email}
//                              autoCapitalize="none"
//                              keyboardAppearance="dark"
//                              keyboardType="email-address"
//                              returnKeyType="next"
//                              errorMessage ={
//                               emailValid ? null : 'Enter valid email address'
//                             }
//                              errorStyle={styles.errorInputStyle}
//                              autoCorrect={false}
//                              blurOnSubmit={false}
//                              autoFocus ={false}
//                              ref={ input => (this.emailInput = input)}
//                             />
//                             <View style={{flex:1, flexDirection: 'row'  ,marginTop: 10  }}>
//                             <Icon active name="note" color ="gray" size={20} /> 
//                             {/* name =note */}
//                             {/* name="location-pin" */}
//                             <Text style={styles.textfield}>TITLE</Text>
//                             </View>
//                                           <Input
//                                             inputContainerStyle={{borderColor: '#e77609', marginLeft: 20}}
//                                             placeholder="something"
//                                             placeholderTextColor="#e77609"
//                                             onChangeText ={(title) => this.setState({title})}
//                                             onSubmitEditing ={() =>{
//                                              this.validateTitle();
//                                              this.reset();
//                                            }}
//                                             value={this.state.title}
//                                             autoCapitalize="none"
//                                             keyboardAppearance="dark"
//                                             keyboardType="default"
//                                             returnKeyType="next"
//                                             errorMessage ={
//                                              titleValid ? null : 'Enter valid Title'
//                                            }
//                                             errorStyle={styles.errorInputStyle}
//                                             autoCorrect={false}
//                                             blurOnSubmit={false}
//                                             autoFocus ={false}
//                                             ref={ input => (this.titleInput = input)}
//                                            />

//                                            <View style={{flex:1, flexDirection: 'row',marginTop: 10  }}>
//                                            <Icon active name="location-pin" color ="gray" size={20} />
//                                            {/* name="location-pin" */}
//                                            <Text style={styles.textfield}>Location</Text>
//                                            </View>
//                                                          <Input
//                                                            inputContainerStyle={{borderColor: '#e77609', marginLeft: 20}}
//                                                            placeholder="Ludhiana"
//                                                            placeholderTextColor="#e77609"
//                                                            onChangeText ={(location) => this.setState({location})}
//                                                           //  onSubmitEditing ={() =>{
//                                                           //   this.validateEmail();
//                                                           // }}
//                                                            value={this.state.location}
//                                                            autoCapitalize="none"
//                                                            keyboardAppearance="dark"
//                                                            keyboardType="default"
//                                                            returnKeyType="none"
//                                                           //  errorMessage ={
//                                                           //   emailValid ? null : 'Enter valid Location'
//                                                           // }
//                                                           //  errorStyle={styles.errorInputStyle}
//                                                            autoCorrect={false}
//                                                            blurOnSubmit={false}
//                                                            autoFocus ={false}
//                                                           //  ref={ input => (this.emailInput = input)}
//                                                           />
//                     <View style={{alignItems: 'center',marginVertical: 15}}>
//                        <Button                      
//                          title="SAVE"
//                          containerStyle ={{ flex: -1}}
//                          buttonStyle ={ styles.loginButton}
//                          linearGradientProps ={{
//                           colors: ['#FF9800', '#F44336'],
//                           start: [1, 0],
//                           end: [0.2, 0],
//                          }}
//                          titleStyle ={styles.LoginButtonText}
//                          onPress={this.reset}
//                        />
//                        </View>
//        </View>




// </Card>
// {/* </View> */}
//       </View>
//       </ScrollView>
//       </View>
//       </KeyboardAvoidingView>
//       </ImageBackground>
//     );
//   }
// };

// export default Editprofile;

// const styles = StyleSheet.create({
//   container:{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },
//   hero: {
//     width: SCREEN_WIDTH -100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//     backgroundColor: "white",

//   },

//   heading: {
//     color: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     fontSize: 22,
//   },
//   headingtext:{
//     color: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5,
//     fontSize: 13,
//     marginLeft:10
//   },
//   textfield:{
//     color: 'black',
//     paddingLeft: 10,
//     // marginTop: 30,
//     // marginLeft: -137,
//     fontSize: 16,
//     // marginLeft:10,

//     fontWeight: "bold",
//   },
//   loginButton: {
//     height: 45,
//     padding: 20,
//     width:200,
//     backgroundColor: '#27285b',
//     // marginRight: 5, 
//     // marginLeft: -15,
//     alignItems: 'center', 
//     justifyContent: 'center', 
//     alignSelf: 'center',
//     borderRadius: 90
//   },
//   LoginButtonText:{
//     fontFamily: "Georgia",

//   },
//   errorInputStyle: {
//     marginTop: 0,
//     textAlign: 'center',
//     color: '#F44336',
//   },
//   inputStyle: {
//     // flex: 1,
//     marginLeft: -10,
//     color: 'black',
//     fontFamily: 'light',
//     fontSize: 16,
//     width: 250,

//   },
//   backgroundContainer: {
//     flex: 1,
//     width: null,
//     height: null,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pageTitle: {
//     alignSelf: 'center',
//     alignItems: 'center',
//     paddingTop: 10,
//     paddingBottom: 10,
//     flexDirection: 'row',
//     marginTop: 20
//   },
//   title: {
//     fontSize: 20,
//     color: '#ebebeb',
//     fontWeight: "bold",
//     alignItems: 'center'
//   },
// });


