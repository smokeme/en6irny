import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import { fetchedUser } from './actions/userActions';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import Login from './components/Login';
import Home from './components/Home';
import Selection from './components/Selection';
import Map from './components/Map';
import OrderDetail from './components/OrderDetail';

import getTheme from "./theme/components";
import { Root, StyleProvider } from "native-base";
import variables from "./theme/variables/commonColor";
import { asyncUser } from './actions/userActions';

class App extends React.Component {
    state: {
        isLoading: boolean,
        isReady: boolean
      };
    constructor() {
        super();
        this.state = {
          isLoading: false,
          isReady: false,
          username: false,
          token: false
        };
      }
    componentWillMount() {
        this.loadInfo();
        this.loadFonts();
    }
    async loadInfo() {
        var token,username;
        await AsyncStorage.getItem('token').then((value) => {token = value})
        await AsyncStorage.getItem('username').then((value) => {username = value})

        if (token) { 
            
            this.props.dispatch(asyncUser({username: username, token: token}))
        }
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
    
        this.setState({ isReady: true });
    }
    
    render() {
        if (!this.state.isReady || this.state.isLoading) {
          return <Expo.AppLoading />;
    }
    return (
        <StyleProvider style={getTheme(variables)}>
        <Root>
        <NativeRouter>
            <Switch>
            <Route exact path='/' component={this.props.loggedIn ? Home : Login} />
            <Route exact path='/selection' component={Selection} />
            <Route exact path='/map' component={Map} />
            <Route exact path='/orderDetail' component={OrderDetail} />

            </Switch>
        </NativeRouter>
        </Root>
        </StyleProvider>

    );
  }
}

function mapStateToProps(store) {
    return {
        user: store.user.username,
        loggedIn: store.user.loggedIn
    };
}

export default connect(mapStateToProps)(App);
