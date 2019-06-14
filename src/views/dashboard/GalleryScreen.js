import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView ,Dimensions,AsyncStorage} from 'react-native';
import { FileSystem, FaceDetector, MediaLibrary, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 50;

export default class GalleryScreen extends React.Component {
  state = {
    faces: {},
    images: {},
    photos: [],
    selected: [],
    photoUrl:'',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  };

  componentDidMount = async () => {
    const photoUrl = await this.props.photoUrl;
    // await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photoUrl });
  };
  imageUpdate = async() =>{
    var id = await this.props.id;
    var token = await AsyncStorage.getItem('STORAGE_KEY');

        if(this.state.photoUrl != ""){
            const photoURI = await this.props.photoUrl;
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
                    this.props.navigation.navigate('GroupIcon',{
                        groupImage: this.state.photoUrl
                    })
                }).catch(err => alert(err))
            }
    } 
 





  render() {
    return (
      <View style={styles.container}>
    
       
          <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} 
          onPress={this.imageUpdate}>
            <MaterialIcons name="check" size={25} color="#FF4500" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={this.saveToGallery}>
            <Text style={styles.whiteText}>Group icon</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
            <MaterialIcons name="clear" size={25} color="#FF4500" />
          </TouchableOpacity>
        </View>
        <View
         style={{ flex:1,
           justifyContent: 'center', alignSelf: 'center'
        }}
        
         >
                <Image
                  source={{
                    uri: this.state.photoUrl != '' ? this.state.photoUrl : this.state.image
                    //   'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg',
                  }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                  }}
                />
                </View>
        {/* <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {
              // this.state.photos.map(
              this.renderPhoto(this.state.photoUrl)
              // )
              }
          </View>
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#FF4500',
  },
 
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: '#FF4500',
  },
});
