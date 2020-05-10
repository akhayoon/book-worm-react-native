import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import colors from "../../assets/colors";

const BooksCountContainer = ({color, type}) => {
  const books = useSelector(state => state.books);
  return (
    <View style={styles.container}>
      <Text style={{color}}>
        {books[type].length}
      </Text>
    </View>
    );
}

export default BooksCountContainer;

BooksCountContainer.defaultProps = {
  color: colors.txtPlaceholder
}

BooksCountContainer.proptypes = {
  color: PropTypes.string,
  type: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});