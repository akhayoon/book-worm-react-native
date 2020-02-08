import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookComponent from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";
import colors from '../assets/colors';

export default function HomeScreen() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddNewBookVisible, setAddNewBookVisible] = useState(false);
  const [textInputData, setTextInputData] = useState('');
  const [books, setBooks] = useState([]);

  addBook = (book) => {
    setBooks([...books, book]);
    setTotalCount(totalCount + 1);
    setReadingCount(readingCount + 1);
  }

  markAsRead = (selectedBook, index) => {
    let newList = books.filter(book => book !== selectedBook);
    setBooks(newList);
    setReadingCount(readingCount - 1);
    setReadCount(readCount + 1);
  }

  renderItem = (item, index) => (
    <View style={{height: 50, flexDirection: 'row'}}>
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingLeft: 5
        }}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        onPress={() => markAsRead(item, index)}
        style={{backgroundColor: colors.bgSuccess, width: 100}}
      >
          <Text style={{color: 'white'}}>
            Mark as Read
          </Text>
      </CustomActionButton>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View
        style={{
          height: 70,
          borderBottomColor: colors.borderColor,
          borderBottomWidth: 0.5,
          alignItems: 'center',
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 24 }}>Book Worm</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isAddNewBookVisible && 
          <View style={{ height: 50, flexDirection: 'row' }}>
            <TextInput
              style={{
                flex: 1,
                width: 50,
                backgroundColor: colors.bgTextInput,
                paddingLeft: 5
              }}
              placeholder="Enter Your Book Name"
              placeholderTextColor={colors.txtPlaceholder}
              onChangeText={(text) => setTextInputData(text)}
            />
            <CustomActionButton
              style={{backgroundColor: colors.bgSuccess}}
              onPress={() => addBook(textInputData)}
            >
              <Ionicons name="md-checkmark" color="white" size={40} />
            </CustomActionButton>
            <CustomActionButton 
              onPress={() => setAddNewBookVisible(false)}
            >
              <Ionicons name="md-close" color="white" size={40} />
            </CustomActionButton>
          </View>
        }
        <FlatList
          data={books}
          renderItem={({item}, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={{marginTop: 50}}>
              <Text style={{fontWeight: 'bold'}}> Not reading any books</Text>
            </View>
          }
        />
        <CustomActionButton
          style={{backgroundColor: colors.bgPrimary, borderRadius: 25}}
          position="right"
          onPress={() => setAddNewBookVisible(true)}
        >
            <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
        </CustomActionButton>
      </View>
      <View
        style={{
          height: 70,
          borderBottomColor: colors.borderColor,
          borderTopWidth: 0.5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <BookComponent title="Total" count={totalCount} />
        <BookComponent title="Reading" count={readingCount} />
        <BookComponent title="Read" count={readCount} />
      </View>
      <SafeAreaView />
    </View>
  );
}
