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

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            oldPasswordValid: true,

            changePassword: '',
            changePasswordValid: true,

            confirmPassword: '',
            confirmPasswordValid: true,

            isPasswordValid: false,

            token: '',
           
        };
    };

    reset = async () => {
        const {oldPassword,changePassword,confirmPassword} = this.state;
        const oldPasswordValid = this.validateoldPassword();
        const changePasswordValid = this.validatechangePassword();
        const confirmPasswordValid = this.validateconfirmPassword();

        var token = await AsyncStorage.getItem('STORAGE_KEY');
        if (oldPasswordValid && changePasswordValid && confirmPasswordValid ) {
            if(changePassword === confirmPassword )
            {
            
            await fetch(`https://kakaonodeapp.herokuapp.com/mission21/changePassword`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword: changePassword,
                }),
            })
            .then(response => response.json())
                .then(res => {
                    if (res.success === true) {
                        setTimeout(() => {
                            alert('Password Changed successfully'),
                                this.props.navigation.navigate('Login');
                        }, 100)
                    }
                    else {
                            alert(res.message);
                         }
                })
                .catch((error) => alert(error))
                }
                else{
                    const isPasswordValid = this.validatechangePassword() && this.validateconfirmPassword()
                    alert('password should be match');
                    isPasswordValid || (this.changePasswordInput.shake() &&  this.confirmPasswordInput.shake());
                    return isPasswordValid
                }
        }
    }

    validateoldPassword = () => {
        const { oldPassword } = this.state;
        const oldPasswordValid = oldPassword.length >= 8;
        this.setState({ oldPasswordValid });
        oldPasswordValid || this.oldPasswordInput.shake();
        return oldPasswordValid;
    }
    validatechangePassword = () => {
        const { changePassword } = this.state;
        const changePasswordValid = changePassword.length >= 8;
        this.setState({ changePasswordValid });
        changePasswordValid || this.changePasswordInput.shake();
        return changePasswordValid;
    }

    validateconfirmPassword = () => {
        const { confirmPassword } = this.state;
        const confirmPasswordValid = confirmPassword.length >= 8;
        this.setState({ confirmPasswordValid });
        confirmPasswordValid || this.confirmPasswordInput.shake();
        return confirmPasswordValid;
    }


    render() {
        const { oldPassword, confirmPassword, changePassword ,oldPasswordValid,changePasswordValid,confirmPasswordValid ,isPasswordValid} = this.state;

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
                                <Text style={styles.nameHeader}>Reset Password</Text>
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

                                    <View style={{ marginBottom: 20, marginTop: 10 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="user" color="gray" size={20} />
                                            <Text style={styles.textfield}>OldPassword</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="oldPassword"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(oldPassword) => this.setState({ oldPassword })}
                                            onSubmitEditing={() => {
                                                this.validateoldPassword();
                                                this.changePasswordInput.focus();
                                            }}
                                            secureTextEntry

                                            value={oldPassword}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="default"
                                            returnKeyType="next"
                                            errorMessage={
                                                 oldPasswordValid ? null : 'Please enter at least 8 characters'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.oldPasswordInput = input)}
                                        />


                                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="key" color="gray" size={20} />
                                            {/* name =note */}
                                            {/* name="location-pin" */}
                                            <Text style={styles.textfield}>ChangePassword</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="changePassword"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(changePassword) => this.setState({ changePassword })}
                                            onSubmitEditing={() => {
                                                this.validatechangePassword();
                                                this.confirmPasswordInput.focus();
                                            }}
                                            secureTextEntry

                                            value={changePassword}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="default"
                                            returnKeyType="next"
                                            errorMessage={
                                                changePasswordValid ? null : 'Please enter at least 8 characters'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.changePasswordInput = input)}
                                        />
                                                                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                            <Icons active name="key" color="gray" size={20} />
                                            {/* name =note */}
                                            {/* name="location-pin" */}
                                            <Text style={styles.textfield}>ConfirmPassword</Text>
                                        </View>
                                        <Input
                                            inputContainerStyle={{ borderColor: '#e77609', marginLeft: 20 }}
                                            placeholder="confirmPassword"
                                            placeholderTextColor="#e77609"
                                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                            onSubmitEditing={() => {
                                                this.validateconfirmPassword();
                                                this.reset();
                                            }}
                                            secureTextEntry

                                            value={confirmPassword}
                                            autoCapitalize="none"
                                            keyboardAppearance="dark"
                                            keyboardType="default"
                                            returnKeyType="next"
                                            errorMessage={
                                                isPasswordValid ? null : 'password should be match' || confirmPasswordValid ? null : 'Please enter at least 8 characters'
                                            }
                                            errorStyle={styles.errorInputStyle}
                                            autoCorrect={false}
                                            blurOnSubmit={false}
                                            autoFocus={false}
                                            ref={input => (this.confirmPasswordInput = input)}
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

export default ResetPassword;

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







