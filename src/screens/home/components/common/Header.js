import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={ viewStyle }>
      {props.children}
      <Text style={ textStyle }>{ props.headerText }</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
      backgroundColor: '#1E2535',
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      paddingTop: 15,
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
      position: 'relative'
  },
  textStyle: {
    color: '#fff',
    fontSize: 25
  }
};

export { Header };
