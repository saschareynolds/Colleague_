import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";
import {
  Content,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";
import firebase from 'firebase';


const drawerCover = require("./back.png");

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#1E2535" }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          
         
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate("Profile")}>
              
                <Left>
                  <Icon
                    active
                    name="contact"
                    style={{ color: "#fff", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Your Profile
                  </Text>
                </Left>
              </ListItem>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate("Wallet")}
              >
                <Left>
                  <Icon
                    active
                    name="logo-buffer"
                    style={{ color: "#fff", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Your Wallet
                  </Text>
                </Left>
              </ListItem>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate("Reminders")}
              >
                <Left>
                  <Icon
                    active
                    name="alarm"
                    style={{ color: "#fff", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Your Reminders
                  </Text>
                </Left>
              </ListItem>
              <ListItem
                button
                noBorder
                onPress={
                () => {
                  firebase.auth().signOut()
                  this.props.navigation.navigate("Home")
                }}
              >
                <Left>
                  <Icon
                    active
                    name="exit"
                    style={{ color: "#fff", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Logout
                  </Text>
                </Left>
              </ListItem>
          
          
        </Content>
      </Container>
    );
  }
}

export default SideBar;
