import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, AsyncStorage } from 'react-native';
export default class Dialogs extends Component {
    state = {
        visible: false,
    };
    onLogout = async () => {
        try {
            await AsyncStorage.removeItem('STORAGE_KEY');
            Alert.alert("Logout Success!");
            this.props.navigation.navigate('Login')
        } catch (error) {
            console.log('AsyncStorage error: ' + error);
        }
    }
    render() {
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Button title="Logout" onPress={this.onLogout} />
            </View>
        );
    }
}

