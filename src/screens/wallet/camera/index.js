import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Image,
    Button,
    Container,
    Left,
    Header,
    Icon,
    StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import { RNCamera } from 'react-native-camera';

import axios from 'axios';

// API KEYS
const cloudVisionKey = 'AIzaSyDuwT3sNc0RcVAoX2OthyA_QcON66_5zHM';
// Endpoints
const cloudVision = 'https://vision.googleapis.com/v1/images:annotate?fields=responses&key=' + cloudVisionKey;


// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;

import PrimaryView from './PrimaryView';

export default class CameraPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null,
            takeImage: 'hello',
            imageTitle: null,
            image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200',
            type: RNCamera.Constants.Type.back,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button 
             style={styles.backwardsButton}
             onPress={this.backButton} 
             title='  Back'
             color="#fff">
                </Button>

                <StatusBar
                    backgroundColor = "blue"
                    barStyle = "light-content"
                    hidden = {true}
                />
                {this.state.path
                    ? this._renderImage()
                    : this._renderCamera()}
            </View>
        );
    }

    backButton = () =>
    this.props.navigation.goBack()

    _renderCamera() {
        axios.get('http://619849ce.ngrok.io/sms/true')
        .then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
        return (
         
            <Camera ref={(cam) => {
                this.camera = cam;
            }} style={styles.preview} aspect={Camera.constants.Aspect.fill} captureTarget={Camera.constants.CaptureTarget.disk} flashMode={Camera.constants.FlashMode.auto}>
             
                <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}></TouchableOpacity>
            
            </Camera>
        )
    }
    _renderImage() {
        return (<PrimaryView imageStatus={this.state.imageTitle} imagE={this.state.path} BackToCameraView={this._renderBackToCameraView.bind(this)}/>)
    }

    _renderBackToCameraView(){
        console.log('hee');
        this.setState({path:false})
    }

    _useGoogleVision(base64image) {
        axios.post(cloudVision, {

            "requests": [
                {
                    "image": {
                        "content":base64image,

                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION",
                            "maxResults": 1
                        }
                    ]
                }
            ]

        }).then((data) => {

            console.log(data);
            //this._analyseData(data);

            const cardData = data.data.responses[0].fullTextAnnotation.text;

            const cardArray = cardData.split('\n');//.filter(word => word.length > 0);

            const wordArray = cardArray.filter(text => !text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
        && !text.match(/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img)
        && !text.match(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm));
            
        
            console.log(wordArray);
            
            console.log(this.extractEmails(cardData));
            console.log(this.extractPhone(cardData));
            //console.log(this.extractWebsite(cardData));

            phoneArray = this.extractPhone(cardData);

            emailArray = this.extractEmails(cardData);

            this.props.navigation.navigate("DropdownPicker", 
            {nameData: wordArray, 
            emailData: emailArray, 
            phoneData: phoneArray,
            })

        }).catch((error) => {
            console.log(error);
        })
    }

    _analyseData(raw) { 
        console.log(response);
    }

    takePicture() {
        const options = {};
        this.camera.capture({metadata: options}).then((data) => {
            this.setState({path: data.path});
            console.log(this.state.path);
            this.uploadImage(this.state.path);
        }).then(url => {
            this.setState({image_uri: url});

        }).catch(error => console.log(error))

    }

    extractEmails (text){
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    }

    extractPhone (text){
        return text.match(/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img);

    }

    extractWebsite (text){
        return text.match(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm);

    }

    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios'
                ? uri.replace('file://', '')
                : uri
            let uploadBlob = null


            fs.readFile(uploadUri, 'base64').then((data) => {
                console.log(data);
                let base64image = data;
                this._useGoogleVision(base64image);
            }).catch((error) => {
                console.error(error);
            })
        })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#A8BE38',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width

    },
    backwardsButton: {
        flex: 0,
        borderWidth: 4,
        borderStyle: 'solid',
        borderRadius: 50,
        color: "#fff",
        padding: 70,
        margin: 30,
        height: 50,
        width: 70
      },
      topButtons: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
      },
    capture: {
        flex: 0,
        borderColor: '#A8BE38',
        backgroundColor: '#A8BE38',
        borderWidth: 4,
        borderStyle: 'solid',
        borderRadius: 50,
        padding: 10,
        margin: 10,
        height: 70,
        width: 70
    },
    backgroundImage: {
        flex: 1
    }
});
