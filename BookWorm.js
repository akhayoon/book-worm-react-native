import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import colors from "./assets/colors";

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';
import CustomDrawerComponent from "./screens/DrawNavigator/CustomDrawComponent";
import SplashScreen from './screens/SplashScreen';
import BooksCountContainer from './redux/containers/BooksCountContainer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const getHeaderTitle = route => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name 
    : 'Home';

  switch(routeName) {
    case 'Home':
      return 'Books'
    case 'BooksReading':
      return 'Books Reading';
    case 'BooksRead':
      return 'Books Read';
  }
}

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <BooksCountContainer color={color} type="books" />
            case 'BooksReading':
              return <BooksCountContainer color={color} type="booksReading" />
            case 'BooksRead':
              return <BooksCountContainer color={color} type="booksRead" />

          }
        }
      })}
    >
      <Tab.Screen
        name="Books"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Books Reading'
        }}
        name="BooksReading"
        component={BooksReadingScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Books Read'
        }}
        name="BooksRead"
        component={BooksReadScreen}
      />
    </Tab.Navigator>
  );
}

const HomeStackNavigate = ({navigation}) => (
  <Stack.Navigator
    tabBarOptions={{
      ativeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
      style:{backgroundColor: colors.bgMain}
    }}
    screenOptions={{
      headerStyle: {backgroundColor: colors.bgMain},
      headerTintColor: 'white',
      headerLeft: () => 
        <Ionicons name="md-menu" 
          onPress={() => navigation.openDrawer()}
          size={30}
          color="white"
          style={{marginLeft: 10}}
        />
    }}
  >
    <Stack.Screen
      options={({route}) => ({
        title: getHeaderTitle(route)
      })}
      name="HomeTabNavigator" 
      component={HomeTabNavigator} 
      />
  </Stack.Navigator>
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    drawerComponent={props => <CustomDrawerComponent {...props} />}
  >
    <Drawer.Screen
      options={{drawerIcon: () => <Ionicons name="md-home" size={24} />}}
      name="Home "
      component={HomeStackNavigate}
    />
    <Drawer.Screen
      options={{drawerIcon: () => <Ionicons name="md-settings" size={24} />}}
      name="Settings "
      component={SettingsScreen}
    />
  </Drawer.Navigator>
);

const BookWorm = () => {
  const dispatch = useDispatch();
  const signIn = user => dispatch({type: 'SIGN_IN', payload: user});
  const signOut = () => dispatch({type: 'SIGN_OUT'});
  const auth = useSelector(state => state.auth);
  console.log(auth.isSignedIn);
  
  useEffect(() => {
    try {
      this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if(user) {
          signIn(user);
        } else {
          signOut();
        }
      })
    } catch(e) {
      console.log(e);
      signOut();
    }

    return () => {
      this.unsubscribe();
    }
  },[]);

  if(auth.isLoading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      {!auth.isSignedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.bgMain
            },
            headerTintColor: colors.txtWhite
          }}
        >
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      ) : (
          <ActionSheetProvider>
            <AppDrawerNavigator />
          </ActionSheetProvider>
        )}
    </NavigationContainer>
  )
}

export default BookWorm;