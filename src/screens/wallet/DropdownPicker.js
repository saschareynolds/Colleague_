import React, { Component } from "react";
import {   Alert,
  AsyncStorage,
  Text,
  View,
  StyleSheet,} from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";

import DropDown  from 'react-native-dropdown';
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


class DropdownPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      org: '',
      position: '',
      email: '',
      address: '',
      phone: '',

    };
  }


  componentDidMount(){
    updatePosition(this.refs['SELECT1']);
    updatePosition(this.refs['SELECT2']);
    updatePosition(this.refs['SELECT3']);
    updatePosition(this.refs['SELECT4']);
    updatePosition(this.refs['SELECT5']);
    updatePosition(this.refs['SELECT6']);
    updatePosition(this.refs['OPTIONLIST']);

}




  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  
  _name(nameinput) {
    this.setState({
      ...this.state,
      name: nameinput
    });
  }
  
  _org(orginput) {
	this.setState({
      ...this.state,
      org: orginput
    });
  }

  _position(positioninput) {
    this.setState({
        ...this.state,
        position: positioninput
      });
    }

  _email(emailinput) {
	this.setState({
      ...this.state,
      email: emailinput
    });
  }

  _phone(phoneinput) {
    this.setState({
        ...this.state,
        phone: phoneinput
      });
    }

  _address(addressinput) {
      this.setState({
          ...this.state,
          address: addressinput
        });
      }


  _storeData = async () => {
    try {
      await AsyncStorage.setItem('OCRData', JSON.stringify(this.state))
      .then(this.props.navigation.navigate("Wallet"));
    } catch (error) {
      Alert.alert('Error Saving Data, Please Try Again Later')
    }
  }


  renderOptions(data){
    return <Option> {data} </Option>
  }

  render() {

    const { navigation } = this.props

    const nameData = navigation.getParam("nameData", "No Data")
    const emailData = navigation.getParam("emailData", "No Data")
    const phoneData = navigation.getParam("phoneData", "No Data") 

    return (
      <Container>
        <Header
        style={{ backgroundColor: "#A8BE38" }}
        androidStatusBarColor="#dc2015"
        iosBarStyle="light-content"
        >
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" style={{ color: "#FFF" }} />
                </Button>
            </Left>
            <Body>
                <Title style={{ color: "#FFF" }}> Select Info </Title>
            </Body>
            <Right>
                <Button transparent
                onPress={() => this._storeData()}> 
                    <Text style={{ color: "#FFF" }}> Done </Text>
                </Button>
            </Right>
        </Header>

        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff'}}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select the name ..."
            onSelect={this._name.bind(this)}>
            {nameData.map(data => this.renderOptions(data))}
          </Select>

          <Text>Selected Name: {this.state.name}</Text>

         <View style={{ height: 10 }}/>
          
          <Select
            width={250}
            ref="SELECT2"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select the organization ..."
            onSelect={this._org.bind(this)}>
            {nameData.map(data => this.renderOptions(data))}
          </Select>
          <Text>Selected Organization: {this.state.org}</Text>

         <View style={{ height: 10 }}/>

          <Select
            width={250}
            ref="SELECT3"
            optionListRef={this._getOptionList.bind(this)} 
            defaultValue="Select the position ..."
            onSelect={this._position.bind(this)}>

            {nameData.map(data => this.renderOptions(data))}
          </Select>
          
          <Text>Selected Position: {this.state.position}</Text>
         
          <View style={{ height: 10 }}/>


          <Select
            width={250}
            ref="SELECT4"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select the email ..."
            onSelect={this._email.bind(this)}>
            {emailData.map(data => this.renderOptions(data))}
          </Select>
          <Text>Selected Email: {this.state.email}</Text>

         <View style={{ height: 10 }}/>


          
          <Select
            width={250}
            ref="SELECT5"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select the address ..."
            onSelect={this._address.bind(this)}>
            {nameData.map(data => this.renderOptions(data))}
          </Select>
          
          <Text>Selected Address: {this.state.address}</Text>
        
          <View style={{ height: 10 }}/>

          <Select
            width={250}
            ref="SELECT6"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select the phone ..."
            onSelect={this._phone.bind(this)}>
            {phoneData.map(data => this.renderOptions(data))}
          </Select>
          <Text>Selected Phone: {this.state.phone}</Text>

         <View style={{ height: 10 }}/>
         
        <OptionList style={{backgroundColor: '#fff '}} ref="OPTIONLIST"/>

        <View style={{ height: 10 }}/>
        <View style={{ height: 10 }}/>
          </View>
      </Container>
      
       );
     }
    }
     
    const styles = StyleSheet.create({
     
     MainContainer: {
       flex: 1,
       justifyContent: 'center',
       margin: 20
       
     }
     
    });

export default DropdownPicker;