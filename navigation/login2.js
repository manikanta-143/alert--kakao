import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, UIManager, LayoutAnimation, Text, Picker, Alert, View, ImageBackground, ScrollView, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Bg_Img from '../assets/images/Signin-Screen.png';
import styles from '../config/styles';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Input, Button } from 'react-native-elements';
import Dialogs from './dialog';
import LottieView from 'lottie-react-native';
import { MaterialIcons } from '@expo/vector-icons';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const Screen_Width = Dimensions.get('window').width;
// const Screen_Height = Dimensions.get('window').height;

export default class App extends Component {
  state = {
    isLoading: false,
    fontLoading: false,
    email: 'sai.krishna@digimantra.com',
    password: 'sai#1234',
    emailValid: true,
    passwordValid: true,
    roll: '',
    isEmailValid: false,
    spinner: false,
    value: false,
    visible: false,
    userData: [],
    master: 2,
    userrole: null,
  };

  async componentWillMount() {
    await Font.loadAsync({
      light: require('../assets/fonts/Ubuntu-Light.ttf'),
      bold: require('../assets/fonts/Ubuntu-Bold.ttf'),
      light_italic: require('../assets/fonts/Ubuntu-Light-Italic.ttf'),
    });
    this.setState({ fontLoading: true });
    this.setState({ roll: this.props.navigation.state.params.roll });
    this._loadInitialState().done()
  }
  _loadInitialState = async () => {
    var userrole = await AsyncStorage.getItem('userrole');
    if (userrole !== null) {
      this.setState({ userrole: userrole });
    }
    else {
      this.setState({
        userrole: null
      })
    }
  }

  _onTokenStore = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
      // setTimeout(() => {
      //   alert('token stored')
      // }, 100)
    }
    catch (error) {
      alert(error);
      console.log('AsyncStorage error', error.errors.form);
    }
  }

  login = () => {
    const { email, password } = this.state;
    LayoutAnimation.easeInEaseOut();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    if (
      emailValid && passwordValid
    ) {
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email.trim()) || this.emailInput.shake(),
        isPasswordValid: password.length >= 8 || this.passwordInput.shake()
      });
      return fetch(`https://kakaonodeapp.herokuapp.com/mission21/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: email,
          password: password
        })
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success === true) {
            var userProfile = res.message;
            this.setState({ userData: res.message });
            if (userProfile.roleId == this.props.navigation.state.params.user) {
              AsyncStorage.setItem('username', userProfile.name);
              AsyncStorage.setItem('userrole', JSON.stringify(userProfile.roleId));
              AsyncStorage.setItem('photoUrl', userProfile.photoUrl);
              AsyncStorage.setItem('email', userProfile.email);
              AsyncStorage.setItem('phone', JSON.stringify(userProfile.phoneNumber));
              AsyncStorage.setItem('createdBy', JSON.stringify(userProfile.createdBy));
              AsyncStorage.setItem('userId', JSON.stringify(userProfile.id));
              this._onTokenStore('STORAGE_KEY', res.token);
              // setTimeout(() => {
              //   alert('Signin Success this is user role'),
                  this.props.navigation.navigate('UserDrawer', {
                    role: 3
                  }
                  );
              // }, 100)
            }
            else if (userProfile.roleId == this.props.navigation.state.params.master) {
              AsyncStorage.setItem('username', userProfile.name);
              AsyncStorage.setItem('userrole', JSON.stringify(userProfile.roleId));
              AsyncStorage.setItem('photoUrl', userProfile.photoUrl);
              AsyncStorage.setItem('email', userProfile.email);
              AsyncStorage.setItem('phone', JSON.stringify(userProfile.phoneNumber));
              AsyncStorage.setItem('createdBy', JSON.stringify(userProfile.createdBy));
              AsyncStorage.setItem('userId', JSON.stringify(userProfile.id));
              this._onTokenStore('STORAGE_KEY', res.token);
              // setTimeout(() => {
              //   alert('Sign in Success this is master role'),
                  this.props.navigation.navigate('MasterDrawer', {
                    role: 2
                  });
              // }, 100)
            }
            else {
              setTimeout(() => {
                if (this.props.navigation.state.params.user) {
                  alert("Login with registered user email");
                }
                else {
                  alert("Login with registered master email");
                }
              })
            }
          }
          else {
            setTimeout(() => {
              alert(res.errors.form);
            }, 100)
          }
        }).catch((error) => alert(error))
    }
  }

  validateEmail = () => {
    const { email } = this.state;
    const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const userRegx =  /'^[a-z]+[a-zA-Z0-9 -\\_]*$', 'i'/
    const emailValid = emailRegx.test(email);
    LayoutAnimation.easeInEaseOut();
    if (email === "") {
      alert("Please enter your email")
    }
    else {
      this.setState({ emailValid });

      emailValid || this.emailInput.shake();
      return emailValid;
    }
  }

  validatePassword = () => {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    if (password === "") {
      alert("Please enter your password")
    }
    else {
      this.setState({ passwordValid });
      passwordValid || this.passwordInput.shake();
      return passwordValid;
    }
  }

  dialogClose = () => {
    this.setState({ value: false });
  }
  // componentDidMount() {
  //   this.animation.play();
  //   // Or set a specific startFrame and endFrame with:
  //   this.animation.play(130, 120);
  // }
  backToHome = () =>{
   return this.props.navigation.goBack()
  }
  render() {
    const { isLoading, fontLoading, email, emailValid, password, passwordValid, roll } = this.state;

    return !fontLoading && !roll ? (
      <View style={{flex:1, alignItems:'center',justifyContent: 'space-around'}}>
      <Text style={{ textAlign: 'center'}}>Loading....</Text>
        <ActivityIndicator/>
        {/* <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        source={require('../config/animation/loading1.json')}
      /> */}
      </View>
    ) : (
        <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
        <View style={styles.container}>
        <View style={{flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',}}>
          <TouchableOpacity style={{padding: 20,}} 
          onPress={this.backToHome}
          >
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#ebebeb" />
          </TouchableOpacity>
          <TouchableOpacity style={{padding: 20}} >
            <Text style={styles.title}>Sign In</Text>
          </TouchableOpacity>
          <View style={{padding: 20}}>
          </View>
        </View>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            
              <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag'>

                <View style={styles.safeView}>
                  <View style={styles.loginTextBox}>
                    <View style={{ marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={[styles.loginInput, { flexDirection: 'row' }]}>
                        <Icon active name="envelope" color="gray" size={20} />
                        <Text style={{ paddingLeft: 8, fontWeight: 'bold' }}>Email</Text>
                      </View>
                      <FormInput
                        refInput={input => (this.emailInput = input)}
                        value={email}
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="next"
                        errorMessage={
                          emailValid ? null : 'Enter valid email address'
                        }
                        onSubmitEditing={() => {
                          this.validateEmail();
                          this.passwordInput.focus();
                        }}
                      />
                      <View style={[styles.loginInput, { flexDirection: 'row' }]}>
                        <Icon active name="lock" color="gray" size={20} />
                        <Text style={{ paddingLeft: 8, fontWeight: 'bold' }}>Password</Text>
                      </View>

                      <FormInput
                        refInput={input => (this.passwordInput = input)}

                        value={password}
                        onChangeText={password => this.setState({ password })}
                        placeholder="Password"
                        secureTextEntry
                        returnKeyType="next"
                        errorMessage={
                          passwordValid ? null : 'Please enter at least 8 characters'
                        }
                        onSubmitEditing={() => {
                          this.validatePassword;
                          this.login();
                        }}
                      />
                      <View style={{ width: '80%', alignItems: 'center', justifyContent: 'space-around', marginTop: 20 }}>
                        <Button
                          loading={isLoading}
                          title="SIGN IN"
                          containerStyle={{ flex: -1 }}
                          buttonStyle={styles.loginButton}
                          linearGradientProps={{
                            colors: ['#FF9800', '#F44336'],
                            start: [1, 0],
                            end: [0.2, 0],
                          }}
                          titleStyle={styles.LoginButtonText}
                          onPress={this.login}
                          disabled={isLoading}
                        />
                      </View>
                      <View style={styles.loginHereContainer}>
                        <Text style={styles.alreadyAccountText}>
                          Forgot your password ?
                        </Text>
                        <Button
                          title="Click here"
                          titleStyle={styles.loginHereText}
                          containerStyle={{ flex: -1 }}
                          buttonStyle={{ backgroundColor: 'transparent' }}
                          underlayColor="transparent"
                          onPress={() => this.setState({ value: true })}
                        // onPress={() => Alert.alert('🔥', 'You can login here')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              </KeyboardAvoidingView>
            </View>
          
          <Dialogs onClose={this.dialogClose.bind(this)} visible={this.state.value} navigation={this.props.navigation} />
        </ImageBackground>
      );
  }
}

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}

      leftIcon={<Icon name={icon} color="#e77609" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#e77609"
    />
  );
};
