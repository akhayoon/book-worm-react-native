import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../assets/colors';

function getPosition(position) {
    return position === 'left' 
        ? {position: 'absolute', left: 20, bottom: 20}
        : {position: 'absolute', right: 20, bottom: 20}
}

const CustomActionButton = ({children, onPress, style, position}) => {
    const floatingActionButton = position ? getPosition(position) : [];

    return (
        <TouchableOpacity onPress={onPress} style={floatingActionButton}>
            <View style={[styles.button, style]}>
                {children}
            </View>
        </TouchableOpacity>
    );
}

export default CustomActionButton;

const styles = StyleSheet.create({
    button: { 
        height: 50,
        backgroundColor: colors.bgError,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center' 
    }
});

CustomActionButton.propTypes = {
    children: PropTypes.element.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    position: PropTypes.string
}

CustomActionButton.defaultProps = {
    style: {},
}
