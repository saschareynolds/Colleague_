import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  List,
  ListItem,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Segment
} from "native-base";

import styles from "./styles";

const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");

const datas = [
  {
    route: "AaronBennet",
    text: "Aaron Bennet"
  },
  {
    route: "AndyHertzfeld",
    text: "Andy Hertzfeld"
  },
  {
    route: "AnganaGhosh",
    text: "Angana Ghosh"
  },
  {
    route: "BradleyHorowitz",
    text: "Bradley Horowitz"
  },
  {
    route: "BrittanyKelso",
    text: "Brittany Kelso"
  },
  
  {
    route: "CarolineAaron",
    text: "Caroline Aaron"
  }
];

class Anatomy extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      seg: 2
    };
  }
  render() {
    return (
      <Container>
        <Header hasSegment

          style={{ backgroundColor: "blue" }}
          androidStatusBarColor="#dc2015"
          iosBarStyle="light-content"
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: "#FFF" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFF" }}>Your Wallet</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        <Segment>
          <Button
            first
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Card View</Text>
          </Button>
          <Button
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>List View</Text>
          </Button>
        </Segment>

        <Content padder>
          {this.state.seg === 1 &&
          <Card style={styles.mb}>
            <CardItem>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
              <Image
                style={{
                  resizeMode: "cover",
                  width: null,
                  height: 200,
                  flex: 1
                }}
                source={cardImage}
              />
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon active name="alarm" />
                  <Text>Reminders</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="logo-linkedin" />
                  <Text>LinkedIn</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          }

          {this.state.seg === 2 && 
          
          <Content>
            <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />


          </Content>
        }
        </Content>
      </Container>
    );
  }
}


export default Anatomy;
