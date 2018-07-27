import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Left,
  Right,
  Body,
  Segment,
  Fab,
  Tab,
  Tabs,
} from "native-base";
import ReactNative from 'react-native';
const {
  ListView,
  Text,
  View,
  TouchableHighlight,
  Modal, 
  TextInput
} = ReactNative;
import { Card, CardSection, Button, Input, Spinner } from './common';
import firebase from 'firebase';


class SignUpForm extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      seg: 1,
      email : '',
      password: '',
      error: '',
      loading: false,
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

  onLoginButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ loading: true, error: '' });

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then(this.onLoginSuccess)
      .catch(() => {
        (this.onLoginFail)
      });
  }

  logUser = (user) => {
    var ref = firebase.database().ref("users");
    var obj = {
        "user": user,
    };
   
}

  onSignUpButtonPress = () => {
    const { email, password, name, org, pos, address, phone } = this.state;
    const db = firebase.database();
    this.setState({ loading: true, error: '' });

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
      var currentUser = firebase.auth().currentUser;
      db.ref("users").child(currentUser.uid).child("Profile").push().set({
        name: name,
        org: org,
        pos: pos,
        email: email,
        address: address,
        phone: phone
      
      });
      
      this.onLoginSuccess;
    })
    .catch(() => {
      alert('Password must be at least 6 characters long & Email must be a valid address')
      this.setState({ loading: false, error: '' });
    });
  }

  onLoginSuccess = () => {
    this.setState({ email: '', password: '', error: '', loading: false });
  }

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  render() {
    return (
      <Container>
      <Card>
      <CardSection backgroundColor= "#fff" >
          <Input
            label='Nmae'
            value={ this.state.name }
            onChangeText={ name => this.setState({ name }) }
            placeholder='John Doe'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff" >
          <Input
            label='Organization'
            value={ this.state.org }
            onChangeText={ org => this.setState({ org }) }
            placeholder='HMC'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff" >
          <Input
            label='Position'
            value={ this.state.pos }
            onChangeText={ pos => this.setState({ pos }) }
            placeholder='Student'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff">
          <Input
            label='Email'
            value={ this.state.email }
            onChangeText={ email => this.setState({ email }) }
            placeholder='user@gmail.com'
            keyboardType='email-address'
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff" >
          <Input
            label='Address'
            value={ this.state.address }
            onChangeText={ address => this.setState({ address }) }
            placeholder='123 Claremont Ave'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff" >
          <Input
            label='Phone'
            value={ this.state.phone }
            onChangeText={ phone => this.setState({ phone }) }
            placeholder='123-456-7890'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#fff" >
          <Input
            secureTextEntry
            label='Password'
            value={ this.state.password }
            onChangeText={ password => this.setState({ password }) }
            placeholder='**********'
          />
      </CardSection>
        <Text style={styles.errorTextStyle}>
            {this.state.error}
        </Text>

        <CardSection backgroundColor= "#A8BE38">
        <Button onPress={() => this.onSignUpButtonPress()}>Sign Up</Button>
        </CardSection>
      </Card>

</Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default SignUpForm;
