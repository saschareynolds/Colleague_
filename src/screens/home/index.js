import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View } from 'react-native';
import { Header, Button, Spinner } from './components/common/';
import LoginForm from './components/LoginForm';
import IndexEmail from './components/index';
import {default as AppIndexScreen} from './sidebar/';
const launchscreenBg = require("../../../assets/back.png");
import firebaseApp from '../reminders/firebase.js';
class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {

    firebase.auth().onAuthStateChanged((user) => {
      console.log('firebase on auth state change', user);
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    });
  }

  renderContent() {
    switch ( this.state.loggedIn ) {
      case true:
        return (
          <AppIndexScreen navigation = {this.props.navigation}/>
    
        )
      case false:
        return <IndexEmail />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Colleague" />
        { this.renderContent() }
      </View>
    );
  }
}

const styles = {
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
};

export default App;
