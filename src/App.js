import React from 'react';
import { Root, Container } from 'native-base';
import { StackNavigator, DrawerNavigator  } from 'react-navigation';
import Home from './screens/home/';

import SideBar from "./screens/home/sidebar";

import Profile from "./screens/profile/";
import Wallet from "./screens/wallet/";
import Reminders from "./screens/reminders/";
import IndexEmail from "./screens/home/components/"


import DynamicListView from "./screens/wallet/DynamicListView";
import * as firebase from 'firebase';
import CameraPage from "./screens/wallet/camera/";

import DropdownPicker from "./screens/wallet/DropdownPicker";

const Drawer = DrawerNavigator(
  {
    Profile: { screen: Profile },
    Wallet: { screen: Wallet },
    Reminders: { screen: Reminders },
    Home: {screen: Home },
  },
  {
    initialRouteName: "Profile",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
    },

    Drawer: { screen: Drawer },

    DynamicListView: { screen: DynamicListView },



    CameraPage: { screen: CameraPage },

    DropdownPicker: { screen: DropdownPicker },
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render () {
    return (
      <Root>
        <AppNavigator />
      </Root>
    )
  }
}
