import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Text, Header, Left, Right, Body, Button, Icon, Tab, Tabs } from 'native-base';
import {index} from './stylesheet';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const styles = StyleSheet.create(index);

class IndexEmail extends React.Component {

  goToLoginScreen = () => {
    this.tabView.goToPage(1);
  }

  render() {

    return (
      <Container >
      <Tabs ref={(tabView) => {this.tabView=tabView}}>
      
        <Tab style={{backgroundColor: "#f9fbff"}} heading="Log In">
            <LoginForm />
        </Tab>

        
        <Tab style={{backgroundColor: "#f9fbff"}} heading="Sign Up">
            <SignUpForm />
        </Tab>
  
      </Tabs>
    </Container>
    );
  }
}

export default IndexEmail;