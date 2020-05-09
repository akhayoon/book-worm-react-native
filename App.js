import React from "react";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import * as firebase from 'firebase/app';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoadingScreen from './screens/LoadingScreen';

import {Ionicons} from '@expo/vector-icons';
import CustomDrawerComponent from "./screens/DrawNavigator/CustomDrawComponent";
import colors from "./assets/colors";
import firebaseConfig from './config/firebaseConfig'

class App extends React.Component{
  componentDidMount() {
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <AppContainer />
    )
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home ',
      drawerIcon: () => <Ionicons name="md-home" size={24} />
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings ',
      drawerIcon: () => <Ionicons name="md-settings" size={24} />
    }
  }
}, {
  contentComponent: CustomDrawerComponent
})

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen
  },
}, {
  mode: 'modal',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.bgMain
    }
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;