import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import colors from '../assets/colors';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { color } from 'react-native-reanimated';

const LoadingScreen = ({navigation}) => {
    useEffect(() => {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                // navigate user to homescreen
                navigation.navigate('HomeScreen', {user});
            } else {
                // navigate user to login scren
                navigation.navigate('LoginStackNavigator');
            }
        });
        return () => {
            this.unsubscribe();
        }
    });
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color.logoColor} />
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bgMain
    }
})