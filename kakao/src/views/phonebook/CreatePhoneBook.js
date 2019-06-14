import React from 'react';
import { Image, KeyboardAvoidingView, ImageBackground, Dimensions, ScrollView, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'native-base';
import { Avatar, Card, ListItem, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Bg_Img from '../../../assets/images/Edit-Profile.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_SIZE = SCREEN_WIDTH - 50;
const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
];
class CreatePhoneBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneBook: {
        email: '',
        name: '',
        phoneNumber: '',
      },
      emailValid: true,
      isEmailValid: false,
      nameValid: true,
      isNameValid: false,
      phonenumberValid: true,
      isPhonenumberValid: false,
    };
  }

  reset = async () => {
    const token = await AsyncStorage.getItem('STORAGE_KEY');
    const { email, name, phoneNumber } = this.state.phoneBook;

    const emailValid = this.validateEmail();
    const nameValid = this.validateName();
    const phonenumberValid = this.validatePhonenumber();
    if (emailValid && nameValid && phonenumberValid) {

      return fetch('https://kakaonodeapp.herokuapp.com/mission21/phoneBook', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          name,
          phoneNumber: parseFloat(phoneNumber),
        })
      })
        .then((response) => response.json())
        .then((res) => {

        if (!res.message) {
          setTimeout(() => {
            alert('Phonebook user created successfully'),
              this.props.navigation.navigate('Phonebook',{
                phoneBook: this.state.phoneBook,
               }
              );
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

  validateName = () => {
    const { name } = this.state.phoneBook;

    const nameRegx = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    const nameValid = nameRegx.test(name);
    this.setState({ nameValid });
    nameValid || this.nameInput.shake();
    return nameValid;
  }
  validatePhonenumber = () => {
    const { phoneNumber } = this.state.phoneBook;

    const phonenumberRegx = /^(?:(?:\+|0{0,2})91(\s*\s*)?|[0]?)?[6789]\d{9}$/;
    const phonenumberValid = phonenumberRegx.test(phoneNumber);
    this.setState({ phonenumberValid });
    phonenumberValid || this.phonenumberInput.shake();
    return phonenumberValid;
  }

  validateEmail = () => {
    const { email } = this.state.phoneBook;
    const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegx.test(email);
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  changeName = (name) => {
    this.setState({
      phoneBook: {
        ...this.state.phoneBook,
        name,
      }
    })
  };
  changePhone = (phoneNumber) => {
    this.setState({
      phoneBook: {
        ...this.state.phoneBook,
        phoneNumber,
      }
    })
  };

  changeEmail = (email) => {
    this.setState({
      phoneBook: {
        ...this.state.phoneBook,
        email,
      }
    })
  };

  render() {
    const { emailValid, nameValid, phonenumberValid } = this.state;
    const { email, name, phoneNumber }  = this.state.phoneBook;

    return (
      <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.pageTitle}>
              <View>
                <Text style={styles.title}>Create Profile</Text>
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

                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Create Contact</Text>
                  <View style={{ alignItems: 'flex-end', marginTop: -25, marginRight: 5 }}>
                    <Icon onPress={() => console.log("icon pressed")} color="gray" name="close" size={20} />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
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
                      containerStyle={{ borderWidth: 2, borderColor: '#CCC', padding: 5, borderRadius: 100 / 2, }}
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
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="username"
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
                      <Icon active name="envelope" color="gray" size={20} />
                      <Text style={styles.textfield}>EMAIL</Text>
                    </View>
                    <Input
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="username@domain.com"
                      placeholderTextColor="#e77609"
                      onChangeText={(value) => this.changeEmail(value)}
                      onSubmitEditing={() => {
                        this.validateEmail();
                        this.phonenumberInput.focus();
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
                      <Icon active name="note" color="gray" size={20} />
                      {/* name =note */}
                      {/* name="location-pin" */}
                      <Text style={styles.textfield}>Phonenumber</Text>
                    </View>
                    <Input
                      inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                      placeholder="9856896586"
                      placeholderTextColor="#e77609"
                      onChangeText={(value) => this.changePhone(value)}
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
                        phonenumberValid ? null : 'Enter 10 digit valid Phonenumber'
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
                        onPress={this.reset.bind(this)}
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
export default CreatePhoneBook;

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
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    height: 45,
    padding: 20,
    width: 200,
    backgroundColor: '#27285b',
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