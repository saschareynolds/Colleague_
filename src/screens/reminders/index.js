
import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  ActionSheet,
  Body,
  Text,
} from "native-base";
import ReactNative from 'react-native';
import styles from "./styles.js";
const {
  ListView,
  View,
  TouchableHighlight,
  Modal, 
  DatePickerIOS,
  TextInput,
  ActionSheetIOS
} = ReactNative;
import firebase from 'firebase';
import { Alert } from 'react-native';
import Toolbar from './Toolbar.js'
import AddButton from './AddButton.js'
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';
import Mailer from 'react-native-mail';
import { CardSection, Input } from '../home/components/common'

export default class Reminders extends Component {

  constructor(){
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state ={
      text: '',
      itemDataSource: ds,
      modalVisible: false,
      date: new Date(Date.now() + (30 * 1000)),
      clicked: ''
    }
    this.itemsRef = this.getRef().child('items');

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  handleEmail(ind, mail){
    if (ind === 0){
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

  renderRow(item){
    return(
      <TouchableHighlight onPress = { () => {
        this.pressRow(item);
        PushNotification.cancelLocalNotifications({id: ' ' + this.state.text});
      }}>
      <View style = {styles.li}>
        <Text style = {styles.liText}>{item.title}</Text>
      </View>
      </TouchableHighlight>
    );
  }
  
  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }
  getRef(){
    var currentUser = firebase.auth().currentUser;
    return firebase.database().ref("users").child(currentUser.uid);
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
}

  scheduleNotification(id, message, date){
    PushNotification.localNotificationSchedule({ 
      id: id,
      userInfo: {
        id: id
      },
      message: message, // message 
      date: date, // your required time 
    }); 
  }

  getItems(itemsRef){
    //const items = [{title: 'Item One'}, {title: 'Item Two'}];
    itemsRef.on('value', (snap) => {
      const items = [];
      snap.forEach((child)=> {
        items.push({
          title: child.val().title,
          _key: child.key,
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    })
  }

  pressRow(item){
    ActionSheetIOS.showActionSheetWithOptions({
      options: ["Delete Reminder", "Cancel"],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        this.itemsRef.child(item._key).remove()
    PushNotification.cancelLocalNotifications({id: item.title});
      } 
    })
  }

  addItem(){
    this.setModalVisible(true);
  }
  
 

  
  render() {

    const email = '';

    const BUTTONS = ["Call ", "Cancel"];
    const BUTTONS2 = ["Write your email now", "Cancel"];
    var CANCEL_INDEX = 1;
    return (  
 
      <Container style={styles.container}>
        <Header
        style={{ backgroundColor: "#1E2535", }} >
          <Left>
            <Button
                    transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon style={{ color: "#fff" }} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#fff" }} >Reminders</Title>
          </Body>
          <Right />
          </Header>


        <ListView
          dataSource={this.state.itemDataSource}
          renderRow = {this.renderRow}
        />
        <AddButton onPress={this.addItem.bind(this)} title= "Add Reminder"/>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View>
                       
          <Header
            style={{ backgroundColor: "#1E2535" }}
            androidStatusBarColor="#dc2015"
            iosBarStyle="light-content"
            >
            <Left>
              <Button transparent onPress={() => {
                this.setState({modalVisible: false});}}
            >
            <Text style={{ color: "#FFF" }}> Cancel </Text>
            </Button>
            </Left>
            <Body>
                <Title style={{ color: "#FFF" }}> Add Reminder </Title>
            </Body>
            <Right>
            <Button transparent
                onPress={() => {
                  this.itemsRef.push({title:this.state.text});
                  this.setModalVisible(!this.state.modalVisible);
                  this.scheduleNotification(this.state.text, this.state.text, this.state.date)
                }}>
            <Text style={{ color: "#FFF" }}> Save </Text>
            </Button>
            </Right>
            </Header> 

            <View style={{ height: 15 }}/>

            <CardSection >
            
            <Text style = {{fontSize: 18,
                paddingLeft: 20,
                flex: 1, 
                textAlign: 'center'}} > What is your reminder? </Text>
            </CardSection>

            <View style={{ height: 10 }}/>      

            <View>

            <CardSection backgroundColor= "#fff">
              
            <TextInput
              multiline = {true}
              selectionColor={'#000'}
              placeholder= "Contents of your reminder"
              autoCorrect={ false }
              style={ {
                color: '#000',
                paddingRight: 5,
                paddingLeft: 5,
                fontSize: 18,
                lineHeight: 23,
                flex: 2
              } }
              value = {this.state.text}
              onChangeText= {(value)=> this.setState({text: value})}
              autoCapitalize='none'
              keyboardType={ 'default' }
            />

            </CardSection> 

            <View style={{ height: 15 }}/>

            <CardSection >
            
            <Text style = {{fontSize: 18,
                paddingLeft: 20,
                flex: 1, 
                textAlign: 'center'}} > When would you like to be reminded? </Text>
            </CardSection>

            <View style={{ height: 10 }}/>

            <DatePickerIOS
              date={this.state.date}
              onDateChange={(date) => this.setState({ date })}
            />
            

            <View style={{ height: 10 }}/>
          
          <View style={{
               flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
              >

          <Button style={{ backgroundColor: "#E84E4E" }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS2,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Select an option"
                },
                buttonIndex => {
                  this.handleEmail(buttonIndex, '')
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                }
              )}
          >
            <Text>Create Email Draft</Text>
          </Button>

          </View>
          
          <View style={{ height: 10 }}/>

              
              <PushController />
            </View>
        
        
        </View>
        </Modal>
      

      </Container> ) }

}



