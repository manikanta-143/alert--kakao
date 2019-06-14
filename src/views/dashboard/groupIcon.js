import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Pencil from 'react-native-vector-icons/SimpleLineIcons';
import { ImagePicker } from 'expo';
import { Button ,Icon} from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import * as _ from 'lodash';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 50;
export default class GroupIcon extends Component{
    constructor(props){
        super(props);
        this. state={
            groupImage: 'init',
            image: '',
          imageURI:'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png',
          visible: false,
          modalVisible: false,
          id: null,
          groupData:[]
          };
    }
   
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <Icon
                  name="angle-left"
                  size={30}
                  type="font-awesome"
                  iconStyle={{ paddingLeft: 20 ,color: "#FF4500" }}
                  onPress={() => navigation.goBack()}
                
                  //   onPress={navigation.getParam('GroupDetailsBack')}
                  // onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}
                //   onPress={() => navigation.navigate('DrawerOpen')}
                />
              ),
          headerRight: (
          
            <Pencil 
            active 
            name="pencil"
            color="#FF4500"
             size={25} 
             iconStyle={{ alignItems: 'center',marginRight: 10 }}
            //  onPress={this.setState({ icon: !this.state.icon })}
            // onPress={this.onSpeakerPhotoPress.bind(this)}
            
            
            onPress={navigation.getParam('openDownDrawer')}
            // onPress={navigation.getParam('onSpeakerPhotoPress')}
              />
             
              
          ),
        };
    }

  async  componentWillMount(){
        // var groupImage = await this.props.navigation.state.params.groupImage;
        var id = await this.props.navigation.state.params.Gid;
        // alert(groupImage)
        this.setState({ id});
        this._getGroupDetails();
        this._groupImage();
    }
    componentWillReceiveProps(nextProps){
        if(!_.isEqual(nextProps.navigation, this.props.navigation)){
          this._getGroupDetails();
          this._groupImage();
        }
      }
    _getGroupDetails = async () => {
        var id = await this.props.navigation.state.params.Gid;
        var token = await AsyncStorage.getItem('STORAGE_KEY');
        
        await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groups/${id}`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((json) => {
            this.setState({groupData: json });
          }).catch(error => alert('error in get request', error))
      };
      _groupImage = async () =>{
        var id = await this.props.navigation.state.params.Gid;
        var token = await AsyncStorage.getItem('STORAGE_KEY');
    
        await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groupImage/${id}`, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((json) => {
            this.setState({ groupImage : json.groupImage });
          }).catch(error => alert('error in get request', error))
      }

    componentDidMount() {
        // this.props.navigation.setParams({ onSpeakerPhotoPress: this.onSpeakerPhotoPress.bind(this) });
        this.props.navigation.setParams({ openDownDrawer: this.openDownDrawer.bind(this) });
        this.props.navigation.setParams({ GroupDetailsBack : this.GroupDetailsBack.bind(this)})
      }
      GroupDetailsBack =()=>{
          return this.props.navigation.navigate('GroupDetails',{
              groupData: this.state.groupData
          })
      }
      openDownDrawer = () =>{
        
         this.setState({modalVisible:!this.state.modalVisible })
      }
      _toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
          this.setState({modalVisible: !this.state.modalVisible})
      };
    onSpeakerPhotoPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          base64: true,
        });
        if (!result.cancelled) {
          this.setState({
            image: result.uri,
            imageURI: result.uri,
            modalVisible: !this.state.modalVisible,
            visible : !this.state.visible
          });
        
        }
      };
    imageUpdate = async() =>{
    var id = await this.props.navigation.state.params.Gid;
    var token = await AsyncStorage.getItem('STORAGE_KEY');
    var role = await AsyncStorage.getItem('userrole');

        if(this.state.image != ""){
            const photoURI = this.state.image;
                const image = {
                    uri: photoURI,
                    type: 'image/jpeg',
                    name: 'myImage' + '-' + Date.now() + '.jpg'
                    // name: 'myImage' + '-' +'.jpg'
              
                  }
                const formdata = new FormData();
                formdata.append('image',image);
                await fetch(`https://kakaonodeapp.herokuapp.com/mission21/groupPic/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                      'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    },
                    body: formdata
                }).then( () =>{
                    alert('group photo updated successfully')
                    this.props.navigation.navigate('GroupDetails',{
                        groupImage: this.state.image
                    })
                    //  if(role == 2)
                    //     {
                    //     setTimeout(() => {
                    //         alert('Group photo updated successfully');
                    //         this.props.navigation.navigate('Groups',{
                    //             groupUpdate: [this.state.Groupname,this.state.selectedValue],
                    //         });
                    //     })
                    //     }
                    //    if(role == 3) {
                    //         setTimeout(() => {
                    //             alert('Group photo updated successfully');
                    //             this.props.navigation.navigate('Dashboard',{
                    //                 groupUpdate: [this.state.Groupname,this.state.selectedValue],
                    //             });
                    //         })
                    //     }
                 
                }).catch(err => alert(err))
            }
    } 
    onCamPress =() =>{
       return this.props.navigation.navigate('CameraScreen',{
           Gid: this.state.id
        },() => this.setState({modalVisible: !this.state.modalVisible}));
       
    }
    render(){
        const {visible}= this.state;
        console.log(this.state.groupImage.toString(),'here');
        console.log(this.state.imageURI,'2 here')
        return(
           
                    
                    <View style={{ flex:1, justifyContent: 'center', alignSelf: 'center'}}>
            
                <Image
                  source={{
                    uri: this.state.image == '' ? this.state.groupImage.toString() : this.state.imageURI
                    //   'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
                  }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                    position: 'relative',
                  }}
                  
                />
                
                <BottomSheet
                visible={this.state.modalVisible}
                onBackButtonPress={this._toggleBottomNavigationView}
                onBackdropPress={this._toggleBottomNavigationView}
              >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                      upload using
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={this.onSpeakerPhotoPress}>
                          <View style={{ flexDirection: 'column', margin: 30 }}>
                            <Image
                              source={require('../../../assets/icons/gmail.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            {/* <Button onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
                                title="support@example.com" /> */}
                            <Text style={{ textAlign: 'center' }}
                            //  onPress={() => Linking.openURL(`mailto:${this.state.selectedValue.map(e => e.email)}?subject=Testing&body=You up testing multiple email auth`)}
                            //  onPress=  {()=>Alert.alert("Send through email")}
                            >Gallary</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onCamPress}>
                          <View style={{ flexDirection: 'column', margin: 30 }} onPress={() => alert("send through default message app")} >
                            <Image
                              source={require('../../../assets/icons/message.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            <Text style={{ textAlign: 'center' }} >Camera</Text>
                          </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => console.log('kakao')}>
                          <View style={{ flexDirection: 'column', margin: 30 }}>
                            <Image
                              source={require('../../../assets/icons/kakao.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                              }}
                            />
                            <Text style={{ textAlign: 'center' }}>kakao</Text>
                          </View>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </View>
              </BottomSheet>
               {
               visible ?( 
                <TouchableOpacity
                            onPress={this.imageUpdate}
                            style={{
                                borderWidth:4,
                                borderColor:'white',
                                alignItems:'center',
                                justifyContent:'center',
                                width:50,
                                position: 'absolute',                                          
                                // bottom: 10,      
                                top:100,                                             
                                right: 0,
                                height:50,
                                backgroundColor:'#FF4500',
                                borderRadius:100,

                                }}
                            >
                            <Icon name="check"  size={30} color="#ebebeb" />
                            </TouchableOpacity>
                    ): null
                } 
                  
            </View>
          
        )
    }
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      },
});