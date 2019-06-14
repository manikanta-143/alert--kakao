import DropdownAlert from 'react-native-dropdownalert';
import React from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, ImageBackground, Dimensions, ScrollView, StyleSheet, Alert,Platform } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'native-base';
import { Avatar, Card, ListItem, Button, Input, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
import { DrawerActions } from 'react-navigation';

import { Constants, Permissions, ImagePicker } from 'expo';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_SIZE = SCREEN_WIDTH - 50;
const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
];

class AddUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addUser:{
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
            },
            emailValid: true,
            isEmailValid: false,
            nameValid: true,
            isNameValid: false,
            phonenumberValid: true,
            isPhonenumberValid: false,
            passwordValid: true,
            image: '',
            imageURI: 'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png'
            // 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            // 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
        };
    };
    reset = async() => {
        var token = await AsyncStorage.getItem('STORAGE_KEY');
        const { email, name, phoneNumber, password } = this.state.addUser;
        const photoURI = this.state.image;
        const uriParts = photoURI.split('.');
        const fileType = uriParts[uriParts.length -1];
        const photoName = 'photo_'+ Date.now() + '.' + fileType;
        const photoType = 'image/'+ fileType;
        
    //     const formData = new FormData();
    //    await formData.append('email',email);
    //    await  formData.append('name',name);
    //    await formData.append('phoneNumber',parseFloat(phoneNumber));
    //    await  formData.append('password',password);

    //     var photoUpload = {
    //         uri: Platform.OS === 'android' ? photoURI  : photoURI.replace("file://", ""),
    //         mimetype: photoType,
    //         originalname : photoName
    //     };
    //     // formData.append('image',photoUpload);
    //  await   formData.append('image',photoUpload);
    

    const image = {
        uri: photoURI,
        type: 'image/jpeg',
        name: 'myImage' + '-' + Date.now() + '.jpg'
        // name: 'myImage' + '-' +  '.jpg'

  }
  const imgBody = new FormData();
  imgBody.append('image', image);
  imgBody.append('email',email);
       imgBody.append('name',name);
      imgBody.append('phoneNumber',parseFloat(phoneNumber));
       imgBody.append('password',password);

        const emailValid = this.validateEmail();
        const nameValid = this.validateName();
        const phonenumberValid = this.validatePhonenumber();
        const passwordValid = this.validatePassword();
        const photoValidate = this.photoValidate();
        if (emailValid && nameValid && phonenumberValid && passwordValid ) {
            // this.setState({
            //     isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            //     isNameValid: this.validateName(name) || this.nameInput.shake(),
            //     isPhonenumberValid: this.validatePhonenumber(phonenumber) || this.phonenumberInput.shake(),
            //     isPasswordValid: password.length >= 8 || this.passwordInput.shake()
            // });
            return  fetch(global.profile, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                   Authorization: `Bearer ${token}`
                },
                body: imgBody
            }).then(response => response.json())
                .then(res => {
                    if (!res.message) {
                        setTimeout(() => {
                            // alert('User created successfully'),
                            this.dropdown.alertWithType('success', 'Success', 'Received data.');
                                this.props.navigation.navigate('Users',{
                                    addUser: this.state.addUser
                                });
                        }, 100)
                    }
                    else {
                        setTimeout(() => {
                            alert(res.message);
                        })
                    }
                }).catch((error) => alert(error))
        }
    }
    photoValidate = () =>{
       const {image}= this.state;
       if(image === ''){
          alert("please select a picture")
       }
    }
    validateName = () => {
        const { name } = this.state.addUser;
        const nameRegx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        const nameValid = nameRegx.test(name);
        this.setState({ nameValid });
        nameValid || this.nameInput.shake();
        return nameValid;
    }
    validatePhonenumber = () => {
        const { phoneNumber } = this.state.addUser;
        const phonenumberRegx = /^(?:(?:\+|0{0,2})91(\s*\s*)?|[0]?)?[6789]\d{9}$/;
        const phonenumberValid = phonenumberRegx.test(phoneNumber);
        this.setState({ phonenumberValid });
        phonenumberValid || this.phonenumberInput.shake();
        return phonenumberValid;
    }
    validatePassword = () => {
        const { password } = this.state.addUser;
        const passwordValid = password.length >= 8;
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }
    validateEmail = () => {
        const { email } = this.state.addUser;
        const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid = emailRegx.test(email);
        this.setState({ emailValid });
        emailValid || this.emailInput.shake();
        return emailValid;
    }
    // onPhotoPress = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: false,
    //         base64: true,
    //     });
    //     if (!result.cancelled) {
    //         this.setState({
    //             image: result.uri,
    //             imageURI: result.uri
    //         })
    //     }
    // }

    onPhotoPress = async () => {
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
        // const permissions = Permissions.CAMERA_ROLL;
        // const { status } = await Permissions.askAsync(permissions);
    
        // console.log(permissions, status);
        // if(status === 'granted') {
        //   let image = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: 'Images',
        //   }).catch(error => console.log(permissions, { error }));
        //        if (!image.cancelled) {
        //     this.setState({
        //         image: image.uri,
        //         imageURI: image.uri
        //     })
        // }
        // }
      }

    changeName = (name) =>{
      this.setState({
          addUser: {
              ...this.state.addUser,
              name
          }
      })
    }
    changeEmail = (email) =>{
        this.setState({
            addUser: {
                ...this.state.addUser,
                email
            }
        })
      }
      changePassword = (password) =>{
        this.setState({
            addUser: {
                ...this.state.addUser,
                password
            }
        })
      }
      changePhoneNumber = (phoneNumber) =>{
        this.setState({
            addUser: {
                ...this.state.addUser,
                phoneNumber
            }
        })
      }
    render() {
        console.log('image uri is', this.state.imageURI);
        const { emailValid, nameValid, phonenumberValid, passwordValid } = this.state;
        const { name, email,phoneNumber,password} = this.state.addUser;
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

                                // onPress={() => this.props.navigation.goBack()}
                                //   onPress={() => navigation.navigate('DrawerOpen')}
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
                                // onPress={() => this.props.navigation.goBack()}
                                //   onPress={() => navigation.navigate('DrawerOpen')}
                                />
                            </View>
                            <View style={styles.middle}>
                                <Text style={styles.nameHeader}>Create Profile</Text>
                            </View>
                            <View style={styles.right}>
                            </View>
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
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Create Profile</Text>
                                    <View style={{ alignItems: 'flex-end', marginTop: -25, marginRight: 5 }}>
                                        <Icons onPress={() => this.props.navigation.navigate('Dashboard')} color="gray" name="close" size={20} />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                        <Avatar
                                            small
                                            rounded
                                            source={{
                                                uri:
                                                    this.state.imageURI
                                                // 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
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
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="name"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(value) => this.changeName(value)}
                                            onSubmitEditing={() => {
                                                this.validateName();
                                                this.emailInput.focus();
                                            }}
                                            value={name}
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
                                            <Icons active name="envelope" color="gray" size={20} />
                                            <Text style={styles.textfield}>EMAIL</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="username@domain.com"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(value) => this.changeEmail(value)}
                                            onSubmitEditing={() => {
                                                this.validateEmail();
                                                this.passwordInput.focus();
                                            }}
                                            value={email}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            errorMessage={
                                                emailValid ? null : 'Enter valid email address'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.emailInput = input)}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="lock" color="gray" size={20} />
                                            {/* name =note */}
                                            {/* name="location-pin" */}
                                            <Text style={styles.textfield}>Password</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="password"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(value) => this.changePassword(value)}
                                            onSubmitEditing={() => {
                                                this.validatePassword();
                                                this.phonenumberInput.focus();
                                            }}
                                            secureTextEntry

                                            value={password}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="default"
                                            returnKeyType="next"
                                            errorMessage={
                                                passwordValid ? null : 'Please enter at least 8 characters'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.passwordInput = input)}
                                        />
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="key" color="gray" size={20} />
                                            {/* name =note */}
                                            {/* name="location-pin" */}
                                            <Text style={styles.textfield}>Phonenumber</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="7386538559"
                                            maxLength={10}
                                            placeholderTextColor="#e77609"
                                            onChangeText={(value) => this.changePhoneNumber(value)}
                                            onSubmitEditing={() => {
                                                this.validatePhonenumber();
                                                this.reset();
                                            }}
                                            value={phoneNumber}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="phone-pad"
                                            returnKeyType="next"
                                            errorMessage={
                                                phonenumberValid ? null : 'Enter valid Phonenumber'
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
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
                <DropdownAlert ref={ref => this.dropdown = ref} />
            </ImageBackground>
        );
    }
};

export default AddUsers;

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