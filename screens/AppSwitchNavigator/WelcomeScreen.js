import React from 'react';
import {View, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import CustomActionButton from '../../components/CustomActionButton';
import colors from '../../assets/colors';

export default class WeclomeScreen extends React.Component{
  render() {
    return(
      <View style={{flex: 1, backgroundColor: colors.bgMain}}>
        <View 
          style={{
            flex: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
           <Ionicons name="md-bookmarks" size={150} color={colors.logoColor} />
           <Text style={{fontSize: 50, color: 'white'}}>
            Book Worm
           </Text> 
        </View> 
        <View 
          style={{
            flex: 1,
            borderColor: 'orange',
            alignItems: 'center'
          }}
          >
          <CustomActionButton 
            title="Log In"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={{
              width: 200,
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.bgPrimary,
              marginBottom: 10
            }}
          >
            <Text style={{color: 'white'}}>Log In</Text> 
          </CustomActionButton>
          <CustomActionButton
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
            style={{
              width: 200,
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.bgError
            }}
          >
            <Text style={{color: 'white'}}>Sign Up</Text>
          </CustomActionButton>
        </View>
      </View>
    )
  }
}