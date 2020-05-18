import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../assets/colors'

const SplashScreen = () => {
  return (
    <View style={{backgroundColor: colors.bgMain, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../assets/splash.json')}
        autoPlay
        loop
        style={{height: 200, width: 200}}
      />
    </View>
  );
}

export default SplashScreen;
