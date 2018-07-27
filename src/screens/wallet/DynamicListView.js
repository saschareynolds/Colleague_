import React, { Component } from "react";

import {
  Container,
  Text,
  View,
  ActionSheet
} from "native-base";
import firebase from 'firebase';
import ReactNative from 'react-native';
const {
  ListView,
  TouchableHighlight,
  Modal,
  Alert,
  ActionSheetIOS
} = ReactNative;
import styles from "./styles.js";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Mailer from 'react-native-mail';

export default class DynamicListView extends Component {
  
  constructor(){
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state ={
      dataSource: ds,
      modalVisible: false
    }
    this.namesRef = this.getRef().child('contacts')

  }

  handleCall(ind, number){
    if (ind === 0){
      RNImmediatePhoneCall.immediatePhoneCall(number);
    }
  }
  handleEmail(ind, mail){
    if (ind === 1){
      Mailer.mail({
        subject: '',
        recipients: [mail],
        ccRecipients: [''],
        bccRecipients: [''],
        body: '',
        isHTML: true,
        /*attachment: {
          path: '',  // The absolute path of the file from which to read data.
          type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: '',   // Optional: Custom filename for attachment
        }*/
      }, (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
      });
    }
  }
  
  getRef(){
    var currentUser = firebase.auth().currentUser;
    return firebase.database().ref("users").child(currentUser.uid);
  }

  componentWillMount(){
    this.listenForNames(this.namesRef);
  }

  componentDidMount(){
    this.listenForNames(this.namesRef);
}
  listenForNames(namesRef) {
    namesRef.on('value', (dataSnapshot) => {
      var info = [];
      dataSnapshot.forEach((child) => {
        info.push({
          name: child.val().name,
          address: child.val().address,
          org: child.val().org,
          phone: child.val().phone,
          pos: child.val().pos,
          email: child.val().email,
          _key: child.key
        });
      });
  
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(info)
      });
    });
  }

  _renderItem(namesRef){
    return(
      <TouchableHighlight onPress = { () => {
        this.pressRow(namesRef);
      }}>
      <View style = {styles.li}>
        <Text style = {styles.liText}>Name: {namesRef.name}</Text>
        <Text style = {styles.liText}>Organization: {namesRef.org}</Text>
        <Text style = {styles.liText}>Position: {namesRef.pos}</Text>
        <Text style = {styles.liText}>Email: {namesRef.email}</Text>
        <Text style = {styles.liText}>Address: {namesRef.address}</Text>
        <Text style = {styles.liText}>Phone: {namesRef.phone}</Text>
      </View>

      </TouchableHighlight>

    );
  }

  deleteContact(ind, namesRef){
    if (ind === 2){
    this.namesRef.child(namesRef._key).remove()
  }}

  pressRow(namesRef) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ["Call " + namesRef.name, "Email " + namesRef.name, "Delete", "Cancel"],
      destructiveButtonIndex: 2,
      cancelButtonIndex: 3
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        this.handleCall(buttonIndex, namesRef.phone)
        this.setState({ clicked: "Call " + namesRef.name });
      } else if (buttonIndex === 1) {
        this.handleEmail(buttonIndex, namesRef.email)
        this.setState({ clicked: "Email " + namesRef.name });
      } else if (buttonIndex === 2) {
        this.deleteContact(buttonIndex, namesRef)
        this.setState({ clicked: "Delete" })
      }
    });
  }
  

  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }

  render(){
  return(   
    <Container style={styles.container}>      
    <ListView
    dataSource={this.state.dataSource}
    enableEmptySections={true}
    renderRow={this._renderItem.bind(this)}
    style={styles.listView}/>
    <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={{marginTop: 22}}>
            <View>
        

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
        </Container> 
  )
  }}


