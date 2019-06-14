import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { Avatar, Button, Icon, SearchBar, Divider, CheckBox } from 'react-native-elements';
import { Font } from 'expo';
import Icons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import Bg_Img from '../../../assets/images/Edit-Profile.png';
import { Item, Input, Thumbnail } from 'native-base';
import Pencil from 'react-native-vector-icons/SimpleLineIcons';
import Close from 'react-native-vector-icons/FontAwesome';
import { ImagePicker } from 'expo';
import { DrawerActions } from 'react-navigation'


const screenWidth = Dimensions.get('window').width;

const USERS = [
    {
        id: 0,
        name: 'Johh Smith',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        value: '- 164',
    },
    {
        id: 1,
        name: 'Sarah Parker',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
        value: '+ 203',
        positive: true,
    },
    {
        id: 2,
        name: 'Paul Allen',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
        value: '+ 464',
        positive: true,
    },
    {
        id: 3,
        name: 'Terry Andrews',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
        value: '- 80',
        positive: false,
    },
    {
        id: 4,
        name: 'Andy Vitale',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
        value: '- 230',
        positive: false,
    },
    {
        id: 5,
        name: 'Terry Andrews',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
        value: '- 80',
        positive: false,
    },
    {
        id: 6,
        name: 'Andy Vitale',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
        value: '- 230',
        positive: false,
    },
    {
        id: 7,
        name: 'Terry Andrews',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
        value: '- 80',
        positive: false,
    },
    {
        id: 8,
        name: 'Andy Vitale',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
        value: '- 230',
        positive: false,
    },
];

var tempCheckValues = new Array();

class EditGroup extends Component {
    state = {
        selectedValue: [],
        image: '',
        imageURI: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Camera-Icon-PNG-715x715.png',
        // 'https://www.searchpng.com/wp-content/uploads/2019/02/Camera-Icon-PNG-715x544.png',
        //  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
        // https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg
        fontLoaded: false,
        checkBoxChecked: []
    };
    async componentDidMount() {
        await Font.loadAsync({
            georgia: require('../../../assets/fonts/Georgia.ttf'),
            regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../../assets/fonts/Montserrat-Light.ttf'),
            bold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    };
    checkBoxChanged(id, value, user) {
        const { checkBoxChecked, selectedValue } = this.state;

        var tempCheckBoxChecked = checkBoxChecked;
        tempCheckBoxChecked[id] = !value;
        this.setState({ checkBoxChecked: tempCheckBoxChecked }, () => console.log(this.state.checkBoxChecked));

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
        const { name, avatar } = user;
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
                            source={{
                                uri: avatar
                            }}
                            activeOpacity={0.95}
                        />
                    </View>
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
        return _.map(USERS, (user, index) => {
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
    render() {
        console.log('final data to send ', this.state.selectedValue);
        return (
            <View style={{ flex: 1 }}>
                {this.state.fontLoaded ? (
                    <SafeAreaView
                        style={{ flex: 1, backgroundColor: '#ebebeb' }}
                    >
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
                                            // onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}

                                            onPress={() => this.props.navigation.goBack()}
                                        //   onPress={() => navigation.navigate('DrawerOpen')}
                                        />
                                    </View>
                                    <View style={styles.middle}>
                                        <Text style={styles.nameHeader}>Edit Group</Text>
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
                                            <Text style={{ flex: 1, color: 'black', fontSize: 20 }}>Group Name </Text>
                                        </View>
                                        <View style={{ marginRight: -220 }}>
                                            <Button
                                                title="Save"
                                                buttonStyle={{
                                                    // height: 33,
                                                    // width: 120,
                                                    backgroundColor: 'transparent',
                                                    // borderRadius: 5,
                                                }}
                                                titleStyle={{
                                                    fontFamily: 'regular',
                                                    fontSize: 20,
                                                    color: '#FF4500',

                                                }}
                                                onPress={() => this.props.navigation.goBack()}
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
                                        <Pencil active name="pencil" size={20} style={{ marginTop: 10, marginRight: 5 }} />
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
                                            this.state.selectedValue.map((e, index) =>
                                                (
                                                    <View key={e.id} >
                                                        <View style={styles.avatarcontainer}>
                                                            <View style={styles.avatar}>
                                                                <Avatar
                                                                    small
                                                                    rounded
                                                                    containerStyle={{ width: 100, height: 80, borderRadius: 18, paddingHorizontal: 10 }}
                                                                    source={{
                                                                        uri: e.avatar,
                                                                    }}
                                                                    activeOpacity={0.95}
                                                                />
                                                                <View style={styles.card}>
                                                                    <Close
                                                                        style={{ backgroundColor: 'white', borderRadius: 30, borderEndColor: 'transparent' }}
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
                                            )}
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

export default EditGroup;

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
        backgroundColor: 'transparent',
        borderRadius: 30,
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
        width: null,
        height: null,
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