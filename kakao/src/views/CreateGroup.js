import React, { Component } from 'react'
import {
    Text, View, SafeAreaView, StyleSheet, ImageBackground, ScrollView, Dimensions,
    TouchableOpacity, Alert, AsyncStorage
} from 'react-native'
import { Avatar, Button, Icon, SearchBar, Divider, CheckBox } from 'react-native-elements';
import { Font } from 'expo';
import Icons from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';
import Bg_Img from '../../assets/images/Edit-Profile.png';
import { Item, Input, Thumbnail } from 'native-base';
import Pencil from 'react-native-vector-icons/SimpleLineIcons';
import Close from 'react-native-vector-icons/FontAwesome';
import { ImagePicker } from 'expo';
import { DrawerActions } from 'react-navigation'

const screenWidth = Dimensions.get('window').width;
var tempCheckValues = new Array();

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            selectedValue: [],
            image: '',
            imageURI: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
            // 'https://www.searchpng.com/wp-content/uploads/2019/02/Camera-Icon-PNG-715x544.png',
            //  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
            // https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg
            fontLoaded: false,
            checkBoxChecked: [],
            token: '',
            usersData: {
                items: [],
            },
            Groupname: ''
        };
    }
    _loadFont = async () => {
        await Font.loadAsync({
            georgia: require('../../assets/fonts/Georgia.ttf'),
            regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../assets/fonts/Montserrat-Light.ttf'),
            bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    componentWillMount() {
        this._loadFont()
        this._getAllUsers();
    };
    // componentDidMount(){
    //     this._getAllUsers();
    // }
    // componentDidUpdate(){
    //     this._getAllUsers();
    // }

    // componentDidUpdate(prevProps, prevState) {

    //     if (!_.isEqual(prevProps, this.props)) {
    //         console.log('here', this.state);
    //         this._getAllUsers();
    //     }
    // };

    _getAllUsers = async () => {
        var token = await AsyncStorage.getItem('STORAGE_KEY');;
        await fetch(global.createphonebook, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => response.json())
            .then((json) => {
                this.setState({ usersData: json });
            }).catch(error => alert('error in get request', error))
            .done();
    };

    checkBoxChanged(id, value, user) {
        const { checkBoxChecked, selectedValue } = this.state;
        var tempCheckBoxChecked = checkBoxChecked;
        tempCheckBoxChecked[id] = !value;
        this.setState({ checkBoxChecked: tempCheckBoxChecked }
            // , () => console.log(this.state.checkBoxChecked)
            );
        if (value) {
            var index = selectedValue.findIndex(function (o) {
                return o.id === id;
            })
            if (index !== -1) selectedValue.splice(index, 1);
        } else {
            this.setState({ selectedValue: [...selectedValue, user] })
        }
    }
    renderCard(user, index) {
        const { name, photourl, phoneNumber } = user;
        { tempCheckValues[user.id] = false }
        return (
            <View
                key={user.id}
                style={{
                    height: 60,
                    marginHorizontal: 20,
                    marginTop: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginLeft: 15 }}>
                        <Avatar
                            small
                            rounded
                            title={name[0]}
                            // leftAvatar={{ title: name[0], source: { uri: photourl } }}                            
                            source={{
                                uri: photourl
                            }}
                            activeOpacity={0.95}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }} >
                        <Text
                            style={{
                                fontFamily: 'regular',
                                fontSize: 15,
                                marginLeft: 10,
                                color: 'gray'
                            }}
                        >
                            {name}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'regular',
                                fontSize: 15,
                                marginLeft: 10,
                                color: 'gray'
                            }}
                        >
                            {phoneNumber}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginRight: 10
                    }}
                >
                    <CheckBox
                        key={user.id}
                        iconType="font-awesome"
                        checkedIcon="check-circle"
                        checkedColor="#FF4500"
                        uncheckedColor="#ebebeb"
                        uncheckedIcon="check-circle"
                        // style={styles.checkbox}
                        checked={this.state.checkBoxChecked[user.id]}
                        onPress={() => this.checkBoxChanged(user.id, this.state.checkBoxChecked[user.id], user)}
                    />
                </View>
            </View>
        )
    }
    renderListCards() {
        return _.map(this.state.usersData.items, (user, index) => {
            return this.renderCard(user, index);
        });
    }
    onSpeakerPhotoPress = async () => {
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
    };
    createGroups = async () => {
        var token = await AsyncStorage.getItem('STORAGE_KEY');;
        if (this.state.selectedValue.length > 0 && !_.isEmpty(this.state.Groupname)) {
            return await fetch(global.creategroup, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    groupName: this.state.Groupname,
                    groupMember: this.state.selectedValue.map(e => e.id)
                })
            }).then((response) =>  response.json())
            .then((res) => {
            this.setState({ Groupname: '', selectedValue: [], checkBoxChecked: [] });
                    if (!res.message) {
                        setTimeout(() => {
                            alert('Group created successfully');
                            this.props.navigation.navigate('Groups',{
                                groupUpdate: [this.state.Groupname,this.state.selectedValue],
                            });
                        }, 100)
                    }
                    else {
                        setTimeout(() => {
                            alert(res.message);
                        })
                    }
                }).catch((error) => alert(error))
        }
        else {
            if (this.state.Groupname === '') {
                alert('Write group name')
            }
            else {
                alert('Add users into the group')
            }
        }
    }
    render() {
        // console.log('navigations in create group',this.props.navigation);
        // console.log(this.state);
        // console.log('final data to send ', this.state.selectedValue.map(e => e.id));
        return (
            <View style={{ flex: 1 }}>
                {this.state.fontLoaded ? (
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#ebebeb' }}>
                        <ImageBackground source={Bg_Img} style={styles.backgroundContainer}>
                            <View style={styles.statusBar} />
                            <View style={styles.navBar}>
                                <View style={styles.container}>
                                    <View style={styles.left}>
                                        <Icon
                                            name="angle-left"
                                            size={30}
                                            type="font-awesome"
                                            iconStyle={{ color: "#ebebeb", marginLeft: 20 }}
                                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                                        // onPress={() => this.props.navigation.goBack()}
                                        //   onPress={() => navigation.navigate('DrawerOpen')}
                                        />
                                    </View>
                                    <View style={styles.middle}>
                                        <Text style={styles.nameHeader}>Create Group</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Icon
                                            name="ellipsis-v"
                                            size={30}
                                            type="font-awesome"
                                            iconStyle={{ color: "#ebebeb" }}
                                            onPress={() => console.log('threee dots')}
                                        // onPress={() => this.props.navigation.goBack()}
                                        // onPress={() => navigation.navigate('DrawerOpen')}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    backgroundColor: 'white',
                                    borderColor: 'transparent',
                                    borderRadius: 22,
                                    alignItems: 'center',
                                    marginHorizontal: 30,
                                    height: 180,
                                    marginTop: 20,
                                    marginBottom: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', flex: 3 }}>
                                        <View style={{ marginLeft: -120 }}>
                                            <Text style={{ flex: 1, color: 'black', fontSize: 20 }}
                                            >Group Name </Text>
                                        </View>
                                        <View style={{ marginRight: -220 }}>
                                            <Button
                                                title="Save"
                                                buttonStyle={{
                                                    // height: 33,
                                                    // width: 120,
                                                    height: 10,
                                                    // width: 120,
                                                    backgroundColor: 'transparent',
                                                    borderRadius: 5,
                                                }}
                                                titleStyle={{
                                                    fontFamily: 'regular',
                                                    fontSize: 20,
                                                    color: '#FF4500',
                                                }}
                                                onPress={this.createGroups}
                                                // onPress={() => this.props.navigation.navigate('Dashboard')}
                                                underlayColor="transparent"
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: 5,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity medium primary style={styles.imageThumbnail} onPress={this.onSpeakerPhotoPress.bind(this)}>
                                        <Thumbnail circle large source={{
                                            uri: this.state.imageURI
                                        }} style={styles.lectureThumbnail} />
                                    </TouchableOpacity>
                                    {/* <Avatar
                                        width={110}
                                        height={110}
                                        source={{
                                            uri:this.state.imageURI
                                                // 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
                                        }}
                                        activeOpacity={0.7}
                                        avatarStyle={{ borderRadius: 100 / 2 }}
                                        overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                        onPress={this.onSpeakerPhotoPress.bind(this)}
                                    /> */}
                                    {/* <Item style={styles.loginInput} > */}
                                    <View style={{ flex: 2, flexDirection: 'row' }}>
                                        <Input
                                            placeholder="Type group subject here.."
                                            placeholderTextColor="gray"
                                            onChangeText={Groupname => this.setState({ Groupname })}
                                            value={this.state.Groupname}
                                            inputStyle={styles.inputStyle}
                                        />
                                        {/* <Pencil active name="pencil" size={20} style={{ marginTop: 10, marginRight: 5 }} /> */}
                                    </View>
                                    {/* </Item> */}
                                    {/* <Text style={{ color: 'black' , fontSize: 8}}> Maximum Photo Size: 1MB </Text> */}
                                </View>
                                <View
                                    style={{
                                        width: 300,
                                        borderWidth: 0.5,
                                        borderColor: 'rgba(222, 223, 226, 1)',
                                        marginHorizontal: 20,
                                        height: 1,
                                        marginVertical: 10,
                                    }}
                                />
                                <SearchBar platform="ios" placeholder="Search" />
                                <Divider />
                            </View>
                            <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                                <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                                    {/* <Text>Hello</Text> */}
                                    <ScrollView
                                        style={{ flex: 1 }}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {
                                            //    this.state.selectedValue.length >0 ?
                                            this.state.selectedValue.map((e, index) =>
                                                (
                                                    <View
                                                        key={e.id}
                                                    >
                                                        <View style={styles.avatarcontainer}>
                                                            <View style={styles.avatar}>
                                                                <Avatar
                                                                    small
                                                                    rounded
                                                                    containerStyle={{ width: 100, height: 80, borderRadius: 18, paddingHorizontal: 10 }}
                                                                    title={e.name[0]}
                                                                    source={{
                                                                        uri: e.photourl,
                                                                    }}
                                                                    activeOpacity={0.95}
                                                                />
                                                                <View style={styles.card}>
                                                                    <Close
                                                                        style={{ backgroundColor: 'white', borderRadius: 10 }}
                                                                        onPress={() => this.checkBoxChanged(e.id, this.state.checkBoxChecked[e.id], e)}
                                                                        color="black" name="times-circle" size={25} />
                                                                </View>
                                                            </View>
                                                            {/* <View style={{ alignItems: 'flex-end', marginBottom: -10, marginRight: 5 }}>
                                                            <Close
                                                                onPress={() => this.checkBoxChanged(e.id, this.state.checkBoxChecked[e.id], e)}
                                                                color="gray" name="times-circle" size={25} />
                                                        </View>
                                                        <View >
                                                        <Avatar
                                                            small
                                                            rounded
                                                            containerStyle={{ width: 100, height: 80, borderRadius: 32, paddingHorizontal: 10 }}

                                                            source={{
                                                                uri: e.avatar,
                                                            }}
                                                            activeOpacity={0.95}
                                                        />
                                                       </View> */}
                                                        </View>
                                                    </View>
                                                )
                                            )
                                            // : alert('Add atleast one user into the group')
                                        }
                                    </ScrollView>
                                </View>
                                {
                                    this.renderListCards()
                                }
                            </ScrollView>
                        </ImageBackground>
                    </SafeAreaView>
                ) : (
                        <Text>Loading...</Text>
                    )}
            </View>
        )
    }
};

export default CreateGroup;

const styles = StyleSheet.create({
    avatarcontainer: {
        flex: 1
    },
    avatar: {
        position: 'relative',
    },
    card: {
        position: 'absolute',
        alignItems: 'flex-end',
        marginBottom: -25,
        marginLeft: 75,
        backgroundColor: 'white',
        borderRadius: 20
    },
    statusBar: {
        height: 10
    },
    container: {
        flex: 7,
        marginTop: 30,
        flexDirection: 'row'
    },
    navBar: {
        height: 60,
        width: screenWidth,
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
    nameHeader: {
        color: '#ebebeb',
        fontSize: 20,
        fontFamily: 'bold',
    },
    backgroundContainer: {
        flex: 1,
        width: screenWidth,
        height: null,
        alignContent: 'space-between'
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    loginInput: {
        // marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        width: 200
    },
    imageThumbnail: {
        // marginTop: 20
    },
    lectureThumbnail: {
        width: 50,
        height: 50,
    },
})