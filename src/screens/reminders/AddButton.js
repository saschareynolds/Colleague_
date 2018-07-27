import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableHighlight
} from 'react-native';
import styles from './styles'


export default class AddButton extends Component{
    render() {
        return(
            <View style = {styles.action}>
                <TouchableHighlight
                 underlayColor = "#A8BE38"
                 onPress = {this.props.onPress}
                >

                <Text style = {styles.actionText}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
            
        )
    }
}

AppRegistry.registerComponent('AddButton', () => AddButton);