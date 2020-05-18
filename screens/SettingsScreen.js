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
import {connect} from 'react-redux';

class SettingsScreen extends React.Component {
    signOut = async() => {
        try {
            await firebase.auth().signOut();
            this.props.signOut();
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

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch({ type: 'SIGN_OUT' })
    }
}

export default connect(null, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bgMain
    }
})