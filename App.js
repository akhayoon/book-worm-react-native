import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookComponent from "./components/BookCount";

export default function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddNewBookVisible, setAddNewBookVisible] = useState(false);
  const [textInputData, setTextInputData] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log(books);
  });

  addBook = (book) => {
    setBooks([...books, book]);
    setTotalCount(totalCount + 1);
    setReadingCount(readingCount + 1);
  }

  markAsRead = (selectedBook, index) => {
    let newList = books.filter((item, itemIndex) => index !== itemIndex);
    setReadingCount(readingCount - 1
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

      <TouchableOpacity onPress={() => markAsRead(item, index)}>
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: '#a5deba',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{color: 'white'}}>
            Mark as Read
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View
        style={{
          height: 70,
          borderBottomColor: "#E9E9E9",
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
                backgroundColor: "#ececec",
                paddingLeft: 5
              }}
              placeholder="Enter Your Book Name"
              placeholderTextColor="grey"
              onChangeText={(text) => setTextInputData(text)}
            />
            <TouchableOpacity onPress={() => addBook(textInputData)}>
              <View style={{ height: 50, backgroundColor: '#a5deba', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="md-checkmark" color="white" size={40} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAddNewBookVisible(false)}>
              <View style={{ height: 50, backgroundColor: '#deada5', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="md-close" color="white" size={40} />
              </View>
            </TouchableOpacity>
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20
          }}
          onPress={() => setAddNewBookVisible(true)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#AAD1E6",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 70,
          borderBottomColor: "#E9E9E9",
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
