import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import {connect} from 'react-redux';

import colors from '../assets/colors';
import CustomActionButton from '../components/CustomActionButton'

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  }

  onSignIn = async () => {
    const {email, password} = this.state;
    if (email && password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
        this.setState({ isLoading: false });
        this.props.signIn(response.user);
      } 
      catch (error) {
        this.setState({ isLoading: false });
        if (error.code === 'auth/user-not-found') {
          alert('User already exists. Try logging in again');
        } else if (error.code === 'auth/invalid-email') {
          alert('Please enter an email address');
        } else if (error.code === 'auth/wrong-password') {
          alert('Invalid password');
        } else {
          alert('Something went wrong');
        }
      };
    } else {
      alert('Please enter username and password');
    }
  }

  onSignUp = async () => {
    const {email, password} = this.state;
    if (email && password) {
      this.setState({ isLoading: true });
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        this.setState({ isLoading: false });
        alert('created user')
      } catch (error) {
        this.setState({ isLoading: false });
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          alert('User already exists. Try logging in again');
        } else {
          alert('Something went wrong');
        }
      };
    } else {
      alert('Please enter username and password');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <View
            style={
              [StyleSheet.absoluteFill],
              {
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                elevation: 1000
              }
            }
          >
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        : null}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          <View style={{ alignItems: 'center' }}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButtons, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: colors.txtWhite }}>
                Login
              </Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButtons, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: colors.txtWhite }}>
                Sign Up
                            </Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch({type: 'SIGN_IN', payload: user})
  }
} 

export default connect(null, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 200
  }
})

