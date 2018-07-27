import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
//import Dimensions from 'Dimensions';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={ onPress } style={ buttonStyle } 
        color='ad5ab8'>
          <Text style={ textStyle }>
            { children }
          </Text>
        </TouchableOpacity>
    );
};


const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16, 
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    borderBottomWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 20,
    borderWidth: 1,
    width: DEVICE_WIDTH - 40,
    borderColor: 'transparent',
    marginLeft: 5,
    marginRight: 5
  },
};
export { Button };
