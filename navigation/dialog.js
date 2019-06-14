import Dialog, { DialogTitle, DialogFooter, DialogButton, DialogContent, SlideAnimation, ScaleAnimation } from 'react-native-popup-dialog';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Input, Button } from 'react-native-elements';
import { Content, Item, Label } from 'native-base';
import { PricingCard } from 'react-native-elements';
const Screen_width = Dimensions.get('window').width;

export default class Dialogs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValid: true,
      isEmailValid: false,
    };
  };
  reset = async() => {
    const { email } = this.state;
   
    const emailValid = this.validateEmail();
    if (emailValid) {
      // this.props.onClose();
     await fetch('https://kakaonodeapp.herokuapp.com/mission21/forgetPassword',{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          email
        })
     })
     .then(response => response.json())
     .then(res => {
      if (res.success === true) {
        this.props.onClose()
        this.props.navigation.navigate('Login');
        alert(res.message)
      }
      else {
          setTimeout(() => {
            alert(res.message);
          })
      }
  })
  .catch((error) => alert(error))

    //   setTimeout(() => {
    //     this.setState({
    //       isEmailValid: this.validateEmail(email) || this.emailInput.shake()
    //     });
    //     Alert.alert('Successfull');
    //     //  this.props.navigation.navigate('Main');
    //     this.props.navigation.navigate('Login');
    //   }, 1000)
    // }
  }
}

  validateEmail = () => {
    const { email } = this.state;
    const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailRegx.test(email);
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }
  render() {
    const { emailValid } = this.state;

    return (
      <View>
        <Dialog
          visible={this.props.visible}
          dialogAnimation={new ScaleAnimation({
            toValue: 0, // optional
            useNativeDriver: true, // optional
          })}
          onTouchOutside={() => this.props.onClose()}
          dialogTitle={
            <View style={{ alignItems: 'flex-end', marginTop: 15, marginRight: 15 }}>
              <Icon onPress={() => this.props.onClose()} color="gray" name="close" size={20} />
            </View>
          }
          footer={
            <View>
              <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Button
                  title="RESET PASSWORD"
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
          }
        >
          <DialogContent>
            <View style={styles.hero}>
              <Icon color="gray" name="lock" size={62} />
              <Text style={styles.heading}>Forgot Password?</Text>
              <Text style={styles.headingtext}>
                We just need your registred email address
                to send you password reset
                </Text>
              <Text style={styles.textfield}>Email Address</Text>
              <Input
                style={{ fontSize: 8 }}
                placeholder="username@domain.com"
                placeholderTextColor="#e77609"
                onChangeText={(email) => this.setState({ email })}
                onSubmitEditing={() => {
                  this.validateEmail();
                }}
                value={this.state.email}
                autoCapitalize="none"
                keyboardAppearance="dark"
                keyboardType="email-address"
                returnKeyType="none"
                errorMessage={
                  emailValid ? null : 'Enter valid email address'
                }
                errorStyle={styles.errorInputStyle}
                autoCorrect={false}
                blurOnSubmit={false}
                autoFocus={false}
                ref={input => (this.emailInput = input)}
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hero: {
    width: Screen_width - 100,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: -137,
    fontSize: 16,
    // marginLeft:10,

    fontWeight: "bold",
  },
  loginButton: {
    height: 45,
    padding: 20,
    width: 250,
    backgroundColor: '#27285b',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 90
  },
  LoginButtonText: {
    fontFamily: "bold",

  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
});