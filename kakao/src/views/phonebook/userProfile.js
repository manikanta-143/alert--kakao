import React from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, ImageBackground, Dimensions, ScrollView, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'native-base';
import { Avatar, Card, ListItem, Button, Input, Icon } from 'react-native-elements';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
import { ImagePicker } from 'expo';
import { DrawerActions } from 'react-navigation';
import Pencil from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CARD_SIZE = SCREEN_WIDTH - 50;
const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
];

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: '',
            name: '',
            phonenumber: '',
            token: '',
            userId: null,
            imageURI: 'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png',
            // 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            // 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
            profile: {}
        };
    };
    onPhotoPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
        });
        if (!result.cancelled) {
            this.setState({
                imageURI: result.uri
            })
        }
    }
    componentWillMount() {
        this._loadProfile();
    }
    // componentDidUpdate() {
    //     this._loadProfile();
    // }
    _loadProfile = async () => {
        var id = await this.props.navigation.state.params.Uid;
        var token = await AsyncStorage.getItem('STORAGE_KEY');
        this.setState({ token })
        await fetch(`https://kakaonodeapp.herokuapp.com/mission21/phoneBook/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(profile => this.setState({ profile: profile[0] }))
            .catch(error => alert('error in get request', error));
    }
    render() {
        const { username, profile } = this.state;
        console.log('username is getting from backend ', username, 'type is', typeof (username));

        return (
            <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <View style={styles.pageTitle}>
                        <View style={styles.left}>
                            <Icon
                                name="angle-left"
                                size={30}
                                type="font-awesome"
                                iconStyle={{ color: "#ebebeb" }}
                                // onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                            onPress={() => this.props.navigation.goBack()}
                            //   onPress={() => navigation.navigate('DrawerOpen')}
                            />
                        </View>
                        <View style={styles.middle}>
                            <Text style={styles.nameHeader}>View Profile</Text>
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
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>View Profile</Text>
                                <View style={{ alignItems: 'flex-end', marginTop: -25, marginRight: 5 }}>
                                    <Icons
                                        onPress={() => this.props.navigation.navigate('Phonebook')}
                                        color="gray" name="close" size={20} />
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 20 }}>
                                    <Avatar
                                        small
                                        rounded
                                        title={this.state.name[0]}
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
                                <View style={{ marginBottom: 20, marginTop: 10, flex: 5, flexDirection: 'column' }}>
                                    <View style={{ flex: 7, flexDirection: 'row', marginTop: 20, }}>
                                        <View style={styles.left}>
                                            <Icons active name="user" color="gray" size={20} />
                                        </View>
                                        <View style={styles.middle1}>
                                            <Text style={{
                                                ...styles.textfield,
                                                color: 'gray'
                                            }}>NAME</Text>
                                            <Text style={styles.textfield}>{profile.name}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Pencil active name="pencil" size={20} style={{ marginTop: 10, marginRight: 5, }} onPress={() => this.props.navigation.navigate('EditPhoneBook', {
                                                Uid: profile.id
                                            })} />
                                        </View>
                                    </View>
                                    <View style={styles.divide} />

                                    <View style={{ flex: 7, flexDirection: 'row', marginTop: 20, }}>
                                        <View style={styles.left}>
                                            <Icons active name="envelope" color="gray" size={20} />
                                        </View>
                                        <View style={styles.middle1}>
                                            <Text style={{
                                                ...styles.textfield,
                                                color: 'gray'
                                            }}>EMAIL</Text>
                                            <Text style={styles.textfield}>{profile.email}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Pencil active name="pencil" size={20} style={{ marginTop: 10, marginRight: 5 }} />
                                        </View>
                                    </View>
                                    <View style={styles.divide} />
                                    <View style={{ flex: 7, flexDirection: 'row', marginTop: 20, }}>
                                        <View style={styles.left}>
                                            <Icons active name="user" color="gray" size={20} />
                                        </View>
                                        <View style={styles.middle1}>
                                            <Text style={{
                                                ...styles.textfield,
                                                color: 'gray'
                                            }}>Phonenumber</Text>
                                            <Text style={styles.textfield}>{profile.phoneNumber}</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Pencil active name="pencil" size={20} style={{ marginTop: 10, marginRight: 5 }} />
                                        </View>
                                    </View>
                                    <View style={styles.divide} />
                                </View>

                            </Card>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
};

export default ViewProfile;

const styles = StyleSheet.create({
    divide: {
        width: 250,
        borderWidth: 0.5,
        borderColor: 'rgba(222, 223, 226, 1)',
        marginHorizontal: 20,
        height: 1,
        marginVertical: 10,
    },
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
        // paddingLeft: 10,
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
        alignItems: 'center',

    },
    middle1: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


