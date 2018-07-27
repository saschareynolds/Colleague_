import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';
import { Alert } from 'react-native';


class LoginForm extends Component {
  state = { email : '', password: '', error: '', loading: false };


  onLoginButtonPress = () => {
    const { email, password } = this.state;

    this.setState({ loading: true, error: '' });

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then(this.onLoginSuccess)
      .catch((error) => {
        alert('Emails or Password inccorect')
        this.setState({ loading: false, error: '' });
      });
  }

  logUser = (user) => {
    var ref = firebase.database().ref("users");
    var obj = {
        "user": user,
    };
   
}

  onLoginSuccess = () => {
    this.setState({ email: '', password: '', error: '', loading: false });
  }

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

 
  renderButton() {
      if (this.state.loading) {
        return <Spinner size='small'/>
      }

      return (
        <Button onPress={this.onLoginButtonPress}>Log in</Button>
      )
  }

  render() {
    return (
      <Card>
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

        <CardSection backgroundColor= "#fff">
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
          { this.renderButton() }
        </CardSection>

      </Card>
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

export default LoginForm;
