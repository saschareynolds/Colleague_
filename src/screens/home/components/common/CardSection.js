import React from 'react';
import { View , Dimensions} from 'react-native';

const CardSection = (props) => {
  //const { contrainerStyle } = styles;
    return (
      <View style={{
        //borderBottomWidth: 1,
        padding: 5,
        width: DEVICE_WIDTH - 40,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        flexDirection: 'row',
        //borderColor: '#ddd',
        position: 'relative',
        borderRadius: 20,
      }}>
        {props.children}
      </View>
    );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = {
  contrainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};
export { CardSection };
