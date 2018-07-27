import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Text,
  Right,
  Body,
  Fab,
} from "native-base";
import ReactNative from 'react-native';
const {
  ListView,
  View,
  Modal, 
  AsyncStorage,
} = ReactNative;
import firebase from 'firebase';
import DynamicListView from "./DynamicListView";
import { Card, CardSection, Input, Spinner } from '../home/components/common'


class Wallet extends Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      name: '',
      org: '',
      position: '',
      email:'',
      address:'',
      phone: '',
      itemDataSource: ds,
      modalVisible: false,
    };
  }

setModalVisible(visible){
    this.setState({modalVisible:visible});
}

getRef(){
    var currentUser = firebase.auth().currentUser;
    return firebase.database().ref("users").child(currentUser.uid);
}

addItem(){
  this.setModalVisible(true);
}

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('OCRData');
    if (value !== null) {
      const OCRValue = JSON.parse(value);

      if (typeof OCRValue.name[1] !== 'undefined') {
        this.setState({name: OCRValue.name[1]});
      }
      if (typeof OCRValue.org[1] !== 'undefined') {
        this.setState({org: OCRValue.org[1]});
      }
      if (typeof OCRValue.position[1] !== 'undefined') {
        this.setState({position: OCRValue.position[1]});
      }
      if (typeof OCRValue.email[1] !== 'undefined') {
        this.setState({email: OCRValue.email[1]});
      }
      if (typeof OCRValue.phone[1] !== 'undefined') {
        this.setState({phone: OCRValue.phone[1]});
      }
      if (typeof OCRValue.address[1] !== 'undefined') {
        this.setState({address: OCRValue.address[1]});
      }

      this.setState({modalVisible: true});
    }
   else{
      this.setModalVisible(!this.state.modalVisible);
    }
   } catch (error) {
     Alert.alert("Error Retrieving Data, Please Try Again Later")
   }
}

async removeItemValue(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}

  render() {
  
    return (

        <Container>
          <View style={{ flex: 1 }}>
          <Header
            style={{ backgroundColor: "#1E2535" }}
            androidStatusBarColor="#dc2015"
            iosBarStyle="light-content"
          >
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name="menu" style={{ color: "#FFF" }} />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "#FFF" }}>Your Wallet</Title>
            </Body>
            <Right>
              
            </Right>
          </Header>

          <DynamicListView navigation = {this.props.navigation}/>

           <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: "#A8BE38" }}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}>
              <Icon name="add" />

              <Button style={{ backgroundColor: '#E84E4E' }}
              onPress={() => {
                alert('After scanning your card, select information on the form, click done, and then navigate to manual contact entry to save data')
                this.props.navigation.navigate("CameraPage")
              }
              }>
                <Icon name="camera" />
              </Button>

              <Button style={{ backgroundColor: '#E84E4E' }}
              onPress={() => this._retrieveData() }>
                <Icon name="person-add" />
              </Button>

            </Fab>

          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View >

          <Header
            style={{ backgroundColor: "#1E2535" }}
            androidStatusBarColor="#dc2015"
            iosBarStyle="light-content"
            >
            <Left>
              <Button transparent onPress={() => {
                this.setState({modalVisible: false});
                this.removeItemValue("OCRData")}}
            >
            <Text style={{ color: "#FFF" }}> Cancel </Text>
            </Button>
            </Left>
            <Body>
                <Title style={{ color: "#FFF" }}> Enter Info </Title>
            </Body>
            <Right>
            <Button transparent
                onPress={() => {
                const contactsRef = this.getRef().child("contacts");
                const newcontactsRef = contactsRef.push();
                newcontactsRef.set({
                  name: this.state.name,
                  org: this.state.org,
                  pos: this.state.position,
                  email: this.state.email,
                  address: this.state.address,
                  phone: this.state.phone
                })
                this.setModalVisible(!this.state.modalVisible);
                this.setState({name: ''})
                this.setState({org: ''})
                this.setState({position: ''})
                this.setState({email: ''})
                this.setState({address: ''})
                this.setState({phone: ''})
              }}>
            <Text style={{ color: "#FFF" }}> Done </Text>
            </Button>
            </Right>
            </Header> 

             <View style={{ height: 10 }}/>


              <View>

              <CardSection backgroundColor= "#fff">
    
                <Input
                  label='Name'
                  value = {this.state.name}
                  placeholder = "Name"
                  onChangeText = {(value)=> this.setState({name: value})}
                />

                </CardSection>
                
                <View style={{ height: 10 }}/>
                
              <CardSection backgroundColor= "#fff">
    
                <Input
                  label='Organization'
                  value = {this.state.org}
                  placeholder = "Organization"
                  onChangeText = {(value)=> this.setState({org: value})}
                />

                </CardSection> 

                 <View style={{ height: 10 }}/>

              <CardSection backgroundColor= "#fff">
    
                <Input
                  label='Position'
                  value = {this.state.position}
                  placeholder = "Position"
                  onChangeText = {(value)=> this.setState({position: value})}
                />

                </CardSection> 

                 <View style={{ height: 10 }}/>

                <CardSection backgroundColor= "#fff">
    
                  <Input
                    label='Email'
                    value = {this.state.email}
                    placeholder = "Email"
                    onChangeText = {(value)=> this.setState({email: value})}
                  />

                  </CardSection> 

                   <View style={{ height: 10 }}/>

                <CardSection backgroundColor= "#fff">
    
                  <Input
                    label='Address'
                    value = {this.state.address}
                    placeholder = "Address"
                    onChangeText = {(value)=> this.setState({address: value})}
                  />

                  </CardSection> 

                   <View style={{ height: 10 }}/>

                  <CardSection backgroundColor= "#fff">
    
                    <Input
                      label='Phone'
                      value = {this.state.phone}
                      placeholder = "Phone"
                      onChangeText = {(value)=> this.setState({phone: value})}
                    />

                    </CardSection> 
            </View>
          </View>
        </Modal>

            </View>
        </Container> 
      
    );
  }
}



export default Wallet;

