import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImageBackground,
   ActivityIndicator
} from 'react-native';
import Camera from 'react-native-camera';



export default class PrimaryView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      animating: true,
    };

  }



  _renderYes() {
    return (
      <View style={styles.bannerWrapper}>
          <View style={styles.bannerB}>
            <Text style={styles.bannerText}>Banana!</Text>
          </View>
          <View style={styles.share}>
              <TouchableHighlight onPress={this.props.BackToCameraView}>
                <Text style ={styles.shareText}>Refresh</Text>
              </TouchableHighlight>
          </View >

      </View>
    )
  }

  _renderNo() {
    return (
      <View style={styles.bannerWrapper}>
        <View style={styles.bannerA}>
          <Text style={styles.bannerTextNo}>Not Banana!</Text>

        </View>
        <View style={styles.share}>
            <TouchableHighlight onPress={this.props.BackToCameraView}>
              <Text style ={styles.shareText}>Refrjjesh</Text>
            </TouchableHighlight>
        </View >


      </View>

    )
  }


    _renderLoading() {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator
           animating={this.state.animating}
           color="#ffffff"
           size="large"
         />
        </View>

      )
    }



  render() {
    return (
      <View style ={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <ImageBackground style ={styles.backgroundImage} resizeMode ={Image.resizeMode.contain} source ={{
          uri: this.props.imagE
        }}>

          { (this.props.imageStatus === null)?this._renderLoading()
             :(this.props.imageStatus === true)? this._renderYes()
            : this._renderNo()
}
        </ImageBackground>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  bannerWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // paddingTop:20,
  },
  bannerText: {
    color: "yellow",
    fontSize: 30,
    fontWeight: "bold",
    // backgroundColor: '#1EBC61',
    textAlign: 'center'
  },
  bannerTextNo: {
    color: "yellow",
    fontSize: 30,
    fontWeight: "bold",
    // backgroundColor: 'lime',
    textAlign: 'center',
    textShadowColor: 'white'

  },
  bannerA:{
      height:50,
      alignItems:'stretch',
      backgroundColor:'red',
      borderBottomLeftRadius:22,
      borderBottomRightRadius:22,

      padding:5
  },
  bannerB:{
      height:50,
      alignItems:'stretch',
      backgroundColor:'#2ecc71',
      borderBottomLeftRadius:22,
      borderBottomRightRadius:22,
  },

  status: {
    //   flex: 1,
    // justifyContent:'center',
    //   alignItems: 'center'

  },
  yay: {
    flex: 1
  },
  yay: {
    flex: 1
  },
  share: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:100
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareText: {
    color: 'white',
    backgroundColor: '#EA4C88',
    fontSize: 18,
    fontWeight: "bold",
    padding: 5
  }

});
