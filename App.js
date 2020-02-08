import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';

const App = () => <AppContainer />

const AppSwitchNavigator = createSwitchNavigator({WelcomeScreen});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;