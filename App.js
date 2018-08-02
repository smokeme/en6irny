import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import MyApp from './src/MyApp.js';
import store from './src/store.js';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MyApp/>
      </Provider>
    );
  }
}

