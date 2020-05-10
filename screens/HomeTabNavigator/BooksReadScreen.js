import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import colors from '../../assets/colors';
import ListItem from '../../components/ListItem';
import CustomActionButton from '../../components/CustomActionButton';
import ListEmptyComponent from '../../components/ListItem';

const BooksReadScreen = ({ item, children }) => {
  const booksRead = useSelector(state => state.books.booksRead);
  const isLoadingBooks = useSelector(state => state.books.isLoadingBooks);

  renderItem = (item, index) => (
    <ListItem item={item} >
      {item.read ? (
        <Ionicons name="md-checkmark" color={colors.logoColor} size={30} />
      ) : (
          <CustomActionButton
            onPress={() => markAsRead(item, index)}
            style={{ backgroundColor: colors.bgSuccess, width: 100 }}
          >
            <Text style={{ color: 'white' }}>
              Mark as Read
            </Text>
          </CustomActionButton>
        )}
    </ListItem>
  );

  return (
    <View style={styles.container}>
      {isLoadingBooks && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            elevation: 1000
          }}>
          <ActivityIndicator size="large" color={colors.logoColor} />
        </View>
      )}
      <FlatList
        data={booksRead}
        renderItem={({ item }, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={!isLoadingBooks && <ListEmptyComponent text="No books read" />}      />
    </View>
  );
}

export default BooksReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  }
});

