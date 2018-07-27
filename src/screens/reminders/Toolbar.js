
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import styles from './styles'


export default class Toolbar extends Component{
    render() {
        return(
            <View>
                <View style = {styles.navbar}>
                <Text styles = {styles.nvabarTitle}>
                {this.props.title}
                </Text>
                </View>
            </View>
        )
    }
}

AppRegistry.registerComponent('Toolbar', () => Toolbar);