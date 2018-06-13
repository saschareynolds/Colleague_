import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  ActionSheet,
  Input,
  Form,
  Item,
  DatePicker,
  View,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

var BUTTONS = ["Call Angana Ghosh", "Cancel"];
var BUTTONS2 = ["Email Angana Ghosh", "Cancel"];
var CANCEL_INDEX = 4;

class AnganaGhosh extends Component {
  render() {
    return (
      <Container style={styles.container}>
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
                <Title style={{ color: "#FFF" }}>Angana Ghosh</Title>
                <Text>Scripps College</Text>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="logo-linkedin" />
                </Button>
            </Right>
        </Header>

        <Content padder>
            <Button
            onPress={() =>
            ActionSheet.show(
                {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: "Select an option"
                },
                buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                    }
                )}
            >
            <Text>Phone</Text>
            <Text>444-444-4444</Text>
            </Button>
          <Text></Text>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS2,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Select an option"
                },
                buttonIndex => {
                  this.setState({ clicked: BUTTONS[buttonIndex] });
                }
              )}
          >
            <Text>Email</Text>
            <Text>AnganaGhosh@scripps.edu</Text>
          </Button>
          <Text></Text>
          <Form>
            <Item regular>
              <Input placeholder="Additional Notes" />
            </Item>
          </Form>
        <Text></Text>
        <Text>Set Reminder</Text><DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
          />
          </Content>
      </Container>
    );
  }
}

export default AnganaGhosh;
