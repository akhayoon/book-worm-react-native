import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';

const SettingsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <CustomActionButton
                style={{
                    backgroundColor: 'transparent',
                    width: 200,
                    borderWidth: 0.5,
                    borderColor: colors.bgError
                }}
                title="Logout"
                onPress={() => navigation.navigate('WelcomeScreen')}
            >
                <Text style={{color: 'white'}}>Logout</Text>
            </CustomActionButton>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bgMain
    }
})