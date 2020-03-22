import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform
} from 'react-native';
import colors from '../../assets/colors'
import { ScrollView } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import {DrawerItems} from 'react-navigation-drawer';

const CustomDrawerComponent = (props) => {
  return (
    <ScrollView>
      <SafeAreaView style={{backgroundColor: colors.bgMain}}/>
      <View style={{
          backgroundColor: 
          colors.bgMain,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? 20 : 0
        }}
      >
        <Ionicons name="md-bookmarks" size={100} color={colors.logoColor} />
        <Text style={{fontSize: 24, color: 'white'}}>
          Book Worm
        </Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
}

export default CustomDrawerComponent;