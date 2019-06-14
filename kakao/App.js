import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import './config/action';
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/splash/icon.png'),
        require('./assets/images/splash.png'),
        require('./assets/images/misson21.png'),
        require('./assets/images/Signin-Screen.png'),
        require('./assets/images/Edit-Profile.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Georgia': require('./assets/fonts/Georgia.ttf'),
        'Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'UBold': require('./assets/fonts/Ubuntu-Bold.ttf'),
        'ULight-Italic': require('./assets/fonts/Ubuntu-Light-Italic.ttf'),
        'ULight': require('./assets/fonts/Ubuntu-Light.ttf'),

      }),
    ]);
  };
  l0veg0thrones
  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

