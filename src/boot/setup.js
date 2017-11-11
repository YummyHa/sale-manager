import Expo from 'expo';
import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import store from "./configureStore";
import App from '../App';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/platform';

export default class Setup extends Component {
    constructor() {
      super();
      this.state = {
        isReady: false
      };
    }

    componentWillMount() {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCkYsjo7lUIt9z-5f_lThYIoN9RJGHNfRk",
        authDomain: "sale-manager-b4444.firebaseapp.com",
        databaseURL: "https://sale-manager-b4444.firebaseio.com",
        projectId: "sale-manager-b4444",
        storageBucket: "sale-manager-b4444.appspot.com",
        messagingSenderId: "1060158949871"
      };

      firebase.initializeApp(config);
      this.LoadFonts();
    }

    async LoadFonts() {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
      });

      this.setState({ isReady: true });
    }

    render() {
      if (!this.state.isReady) {
        return <Expo.AppLoading />
      }
      return (
        <StyleProvider style={getTheme(variables)}>
          <Provider store={store}>
            <App />
          </Provider>              
        </StyleProvider>
      );
    }
}