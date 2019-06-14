import React from 'react';
import { Image, KeyboardAvoidingView, ImageBackground, Dimensions, ScrollView, StyleSheet, Alert,AsyncStorage } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'native-base';
import { Avatar, Card, ListItem, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
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


class EditPhoneBook extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      email: 'developer@digimantra.com',
      emailValid: true,
      isEmailValid: false,
      name: 'developer',
      nameValid: true,
      isNameValid: false,
      phonenumber: '+91 8956896580',
      phonenumberValid: true,
      isPhonenumberValid: false,
      profile: {},
      token: '',
      image: '',
      imageURI:'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png',
    };
  };
  componentWillMount() {
    this._isMounted = true;
    this._loadProfile();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentWillReceiveProps() {
    this._loadProfile()
  }
  // componentDidUpdate(prevProps) {
  //   console.log('this.props', this.props.navigation.state);

  //   if (!_.isEqual(prevProps.navigation, this.props.navigation)) {
  //     this._getAllUsers();
  //   }
  // }
  // componentDidUpdate(){
  //   this._loadProfile();
  //  }
  _loadProfile = async () =>{
    var id =await this.props.navigation.state.params.Uid;
    var token =  await AsyncStorage.getItem('STORAGE_KEY');
    await fetch(`https://kakaonodeapp.herokuapp.com/mission21/phoneBook/${id}`, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
      },
  }).then(response => response.json())
      .then(profile => {
        if (this._isMounted) {
        this.setState({ profile:  profile[0]})
        }
      }).catch(error => alert('error in get request', error));
}
  reset = async() => {
    // const { email, name, phoneumber } = this.state;
    const { phoneNumber, name, id ,email} = this.state.profile;
    const emailValid = this.validateEmail();
    const nameValid = this.validateName();
    const phonenumberValid = this.validatePhonenumber();
    var token = await AsyncStorage.getItem('STORAGE_KEY');

    if (emailValid && nameValid && phonenumberValid) {
      await fetch(`https://kakaonodeapp.herokuapp.com/mission21/phoneBook/${id}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            phoneNumber: parseFloat(phoneNumber),
        }),
    })
        .then(
            setTimeout(() => {
                alert('Profile Updated successfully'),
                    this.props.navigation.navigate('UserViewProfile',{
                      users: this.state.profile
                    });
            }, 100)
        )
        .catch(err => alert(err))
        .done();
      // setTimeout(() => {
      //   this.setState({
      //     isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
      //     isNameValid: this.validateName(name) || this.nameInput.shake(),
      //     isPhonenumberValid: this.validatePhonenumber(phonenumber) || this.phonenumberInput.shake()
      //   });
      //   Alert.alert('Successfull');
      //   //  this.props.navigation.navigate('Main');
      //   this.props.navigation.navigate('Dashboard')
      // }, 1000)
    }
    if(this.state.image != " "){
      const photoURI = this.state.image;
          const image = {
              uri: photoURI,
              type: 'image/jpeg',
              name: 'myImage' + '-' + Date.now() + '.jpg'
              // name: 'myImage' + '-' +'.jpg'
        
            }
          const formdata = new FormData();
          formdata.append('image',image);
          await fetch(`https://kakaonodeapp.herokuapp.com/mission21/phonememberPic/${id}`, {
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`
              },
              body: formdata
          }).then( setTimeout(() => {
            alert('Profile Photo Updated successfully'),
                this.props.navigation.navigate('UserViewProfile',{
                  users: this.state.profile
                });
        }, 100).catch(() => alert("not able to update"))
    )
    .catch(err => alert(err))
    .done();
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
  validateEmail = () => {
    const { email } = this.state.profile;
    const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegx.test(email);
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }
  changeName = (name) => {
    this.setState({
        profile: {
            ...this.state.profile,
            name,
        }
    });
 }
 changeEmail = (email) =>{
   this.setState({
     profile: {
       ...this.state.profile,
       email
     }
   })
 }
 changePhoneNumber = (phoneNumber ) =>{
   this.setState({
     profile: {
       ...this.state.profile,
       phoneNumber
     }
   })
 }
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
}
  render() {
    // console.log('profile is ',this.state.profile[0]);
    // console.log('profile name is ',this.state.profile[0].name);
    const { emailValid, nameValid, phonenumberValid ,profile} = this.state;
    console.log(this.props.navigation.state.params.Uid, 'is user id');
    return (
      <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.pageTitle}>
              <View>
                <Text style={styles.title}>Edit Profile</Text>
              </View>
            </View>
            <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag'>
              <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center',
                marginTop: 0, marginBottom: 20,
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
                    elevation: 0,
                    shadowOpacity: 0
                    // borderColor: 'transparent' ,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Contact</Text>
                  <View style={{ alignItems: 'flex-end', marginTop: -25, marginRight: 5 }}>
                    <Icon onPress={() => console.log("icon pressed")} color="gray" name="close" size={20} />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                    <Avatar
                      small
                      rounded
                      source={{
                        uri: this.state.image == '' ? profile.photourl : this.state.imageURI
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
                  <View style={{ marginBottom: 20, marginTop: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                      <Icon active name="user" color="gray" size={20} />
                      <Text style={styles.textfield}>NAME</Text>
                    </View>
                    <Input
                      name="name"
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="username"
                      placeholderTextColor="#e77609"
                      onChangeText={(name) => this.changeName(name)}
                      onSubmitEditing={() => {
                        this.validateName();
                        this.emailInput.focus();
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
                      <Icon active name="envelope" color="gray" size={20} />
                      <Text style={styles.textfield}>EMAIL</Text>
                    </View>
                    <Input
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="username@domain.com"
                      placeholderTextColor="#e77609"
                      onChangeText={(email) => this.changeEmail(email)}
                      onSubmitEditing={() => {
                        this.validateEmail();
                        this.phonenumberInput.focus();
                      }}
                      value={profile.email}
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
                      <Icon active name="note" color="gray" size={20} />
                      {/* name =note */}
                      {/* name="location-pin" */}
                      <Text style={styles.textfield}>Phonenumber</Text>
                    </View>
                    <Input
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="Phonenumber"
                      placeholderTextColor="#e77609"
                      onChangeText={(phoneNumber) => this.changePhoneNumber(phoneNumber)}
                      onSubmitEditing={() => {
                        this.validatePhonenumber();
                        this.reset();
                      }}
                      value={String(profile.phoneNumber)}
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      keyboardType="default"
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
      </ImageBackground>
    );
  }
};

export default EditPhoneBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textAlign: 'center',
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
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    marginTop: 20
  },
  title: {
    fontSize: 20,
    color: '#ebebeb',
    fontWeight: "bold",
    alignItems: 'center'
  },
});