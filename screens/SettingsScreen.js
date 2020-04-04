import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';
import * as firebase from 'firebase/app';
import 'firebase/auth';

class SettingsScreen extends React.Component {
    signOut = async() => {
        try {
            await firebase.auth().signOut();
            this.props.navigation.navigate('WelcomeScreen');
        } catch(error) {
            alert('Unable to sign out right now');
        }
    }

    render() {
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
                    onPress={this.signOut}
                >
                    <Text style={{color: 'white'}}>Logout</Text>
                </CustomActionButton>
            </View>
        );
    }
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