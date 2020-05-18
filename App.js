import React from "react";
import * as firebase from 'firebase/app';
import {Provider} from 'react-redux';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import firebaseConfig from './config/firebaseConfig'
import { YellowBox } from 'react-native';
import _ from 'lodash';

import store from './redux/store';
import BookWorm from './BookWorm';

// Turns off annoying warning
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class App extends React.Component{
  componentDidMount() {
    if (!firebase.apps.length) {
      this.initializeFirebase();
    }
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <BookWorm />
        </ActionSheetProvider>
      </Provider>
    )
  }
}

export default App;