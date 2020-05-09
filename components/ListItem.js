import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";
import colors from '../assets/colors'

const ListItem = ({item, children}) => {
  return (
    <View style={styles.listItemContainer}>
      <View
        style={styles.imageContainer}>
        <Image source={require('../assets/icon.png')} style={styles.image} />
      </View>
      <View
        style={styles.listItemTitleContainer}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
        {children}
      </View>
    );
}

export default ListItem;


const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 100,
    backgroundColor: colors.ListItembg,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10
  },
  image: {
    flex: 1, 
    height: null,
    width: null,
    borderRadius: 35
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5
  },
  listItemTitle: {
    fontSize: 22,
    color: colors.txtWhite
  }
});