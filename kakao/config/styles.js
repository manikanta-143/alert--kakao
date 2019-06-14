import {Dimensions,StyleSheet} from 'react-native';
const Screen_Width = Dimensions.get('window').width;
const Screen_Height = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingBottom: 20,
  //   paddingTop: 20,
  //   backgroundColor: '#ebebeb',
  //   width: Screen_Width,
  //   height: Screen_Height,
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  // },
  // formContainer: {
  //   flex: 1,
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  // },
  // signUpText: {
  //   color: 'white',
  //   fontSize: 28,
  //   fontFamily: 'light',
  // },
  // whoAreYouText: {
  //   color: '#7384B4',
  //   fontFamily: 'bold',
  //   fontSize: 14,
  // },
   
  // inputContainer: {
  //   paddingLeft: 8,
  //   borderRadius: 40,
  //   borderWidth: 1,
  //   borderColor: 'rgba(110, 120, 170, 1)',
  //   height: 45,
  //   marginVertical: 10,
  //   width: 250,

  // },
  // inputStyle: {
  //   flex: 1,
  //   marginLeft: 10,
  //   color: 'white',
  //   fontFamily: 'light',
  //   fontSize: 16,
  //   width: 250,

  // },
  // errorInputStyle: {
  //   marginTop: 0,
  //   textAlign: 'center',
  //   color: '#F44336',
  // },
  // signUpButtonText: {
  //   fontFamily: 'bold',
  //   fontSize: 13,
  // },
  // signUpButton: {
  //   width: 250,
  //   borderRadius: 50,
  //   height: 45,
  // },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  alreadyAccountText: {
    fontFamily: 'light_italic',
    fontSize: 12,
    color: '#FF9800',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'bold',
    fontSize: 16,
  },

 formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

 inputContainer: {
    // paddingLeft: 8,
    // borderRadius: 40,
    // borderWidth: 1,
    borderColor: '#e77609',
    // height: 45,
    marginTop: 5,
    width: 250,

  },
  inputStyle: {
    // flex: 1,
    marginLeft: -10,
    color: 'black',
    fontFamily: 'light',
    fontSize: 16,
    width: 250,

  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
    signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },


    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        flex: 1,
        width: 360,
        height: null
      },
  
      pageTitle: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        marginTop: 30
      },
  
      title: {
        fontSize: 20,
        color: '#ebebeb',
        fontWeight: "bold",
        alignItems: 'center'
      },
      loginText: {
        fontSize: 20,
        color: '#e77609',
        fontWeight: "bold",
      },
      loginTextBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      },
      googleButton: {
        backgroundColor: 'red', 
        padding: 10, 
        width: 200
      },
      fbButton : {
        backgroundColor: 'blue', 
        padding: 10, 
        width: 200, 
        marginTop: 10
      },
      input: {
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        paddingRight: 45,
        backgroundColor: 'grey',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
      },
      loginInput: {
        width: 300, 
        // backgroundColor: 'transparent', 
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
      },
      loginButton: {
        height: 45,
        width:250,
        backgroundColor: '#27285b',
        marginRight: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
        borderRadius: 90
      },
      registerButton: {
          height: 45,
        width:130, 
        backgroundColor: 'tomato', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
        borderRadius: 90
      },
      forgetpassword:{
        height: 20,
        width:100,
        marginRight: 5, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
      }
});