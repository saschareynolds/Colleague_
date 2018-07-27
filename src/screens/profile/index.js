import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  TouchableHighlight,
  AsyncStorage,
  View
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Form,
  Label,
  Item,
  Modal,
  Input
} from "native-base";

import styles from "./styles";
import firebase from 'firebase';



export default class Profile extends Component {
  constructor(){
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state ={
      dataSource: ds,
      modalVisible: false
    }
    this.namesRef = this.getRef().child('Profile')

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
     
      <View style = {styles.li}>
        <Text style = {styles.liText}>Name: {namesRef.name}</Text>
        <Text style = {styles.liText}>Organization: {namesRef.org}</Text>
        <Text style = {styles.liText}>Position: {namesRef.pos}</Text>
        <Text style = {styles.liText}>Email: {namesRef.email}</Text>
        <Text style = {styles.liText}>Address: {namesRef.address}</Text>
        <Text style = {styles.liText}>Phone: {namesRef.phone}</Text>
      </View>

    );
  }
  

  render(){
  return(
    <Container style={styles.container}>      
    <Header
          style={{ backgroundColor: "#1E2535", }} >
            <Left>
              <Button
                      transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name="menu" style={{ color: "#fff" }}/>
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "#fff" }} >Your Profile</Title>
            </Body>
            <Right>
            </Right>
          </Header>

    <ListView
    dataSource={this.state.dataSource}
    renderRow={this._renderItem.bind(this)}
    enableEmptySections={true}
    contentContainerStyle={styles.listContainer}
    removeClippedSubviews={false}

    //style={styles.listView}
    />
 </Container> 
  )
  }}