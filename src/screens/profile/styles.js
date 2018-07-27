const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: '#f9fbff',
    flex: 1,

  },
  listView: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  li: {
    backgroundColor: '#f9fbff',
    borderColor: 'transparent',
    borderWidth: 1,

    justifyContent: 'center'   

  },
  liContainer: {
    flex: 2,

  },
  liText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',

  },
  
};