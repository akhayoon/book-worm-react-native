import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as firebase from 'firebase/app';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoadingScreen from './screens/LoadingScreen';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';
import CustomDrawerComponent from "./screens/DrawNavigator/CustomDrawComponent";
import colors from "./assets/colors";
import firebaseConfig from './config/firebaseConfig'
import { color } from "react-native-reanimated";


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

const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Total Books'
    }
  },
  BooksReadingScreen: {
    screen: BooksReadingScreen,
    navigationOptions: {
      tabBarLabel: 'Books Reading'
    }
  },
  BooksReadScreen: {
    screen: BooksReadScreen,
    navigationOptions: {
      tabBarLabel: 'Books Read'
    }
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: colors.bgMain
    },
    activeTintColor: colors.logoColor,
    inactiveTintColor: colors.bgTextInput
  }
});

HomeTabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  switch (routeName) {
    case 'HomeScreen':
      return {
        headerTitle: 'Total Books'
      }
    case 'BooksReadingScreen':
      return {
        headerTitle: 'Books Reading'
      }
    case 'BooksReadScreen':
      return {
        headerTitle: 'Books Read'
      }
    default:
      return {
        headerTitle: 'Book Worm'
      }
  }
}

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Ionicons 
            name="md-menu" 
            size={30}
            color={colors.logoColor} 
            onPress={() => navigation.openDrawer()}
            style={{marginLeft: 10}}
          />
        )
      }
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.bgMain
    },
    headerTintColor: colors.txtWhite
  }
})

const AppDrawerNavigator = createDrawerNavigator({
  HomeStackNavigator: {
    screen: HomeStackNavigator,
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
});

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;