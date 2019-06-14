import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationEvents } from 'react-navigation';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const logo = require('../assets/images/misson21.png')
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_SIZE = SCREEN_WIDTH - 20;

export default class LoginScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      master: 2,
      user: 3,
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      light: require('../assets/fonts/Ubuntu-Light.ttf'),
      bold: require('../assets/fonts/Ubuntu-Bold.ttf'),
      lightitalic: require('../assets/fonts/Ubuntu-Light-Italic.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const {
      fontLoaded,
      master,
      user
    } = this.state;

    return !fontLoaded ? (
      <Text> Loading... </Text>
    ) : (
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={logo}
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 10,
              }}
            />
          </View>
          <Text style={styles.maniHead}>Welcome to</Text>
          <Text style={styles.head}>Mission 21</Text>
          <View style={{ width: '60%', alignItems: 'center', justifyContent: 'space-around', marginBottom: 30 }}>
            <Button
              title="I'm Master"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              titleStyle={styles.signUpButtonText}
              onPress={() =>
                this.props.navigation.navigate('signin', {
                  master: master
                })
              }
            />
            <Button
              title="I'm User"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              titleStyle={styles.signUpButtonText}
              onPress={() =>
                this.props.navigation.navigate('signin', {
                  user: user
                })
              }
            />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f1f1',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  head: {
    color: '#e77609',
    fontSize: 28,
    fontFamily: 'bold',
  },
  maniHead: {
    color: '#0e0d0d',
    fontFamily: 'light',
    // fontFamily: 'bold',
    fontSize: 28,
  },

  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 20,
    color: 'black'
  },
  signUpButton: {
    width: SCREEN_WIDTH - 100,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  },
});
