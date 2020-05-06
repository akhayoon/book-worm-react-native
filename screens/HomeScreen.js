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
import * as firebase from 'firebase/app';
require("firebase/database");
import {snapshotToArray} from '../helpers/firebaseHelpers';

export default function HomeScreen(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddNewBookVisible, setAddNewBookVisible] = useState(false);
  const [textInputData, setTextInputData] = useState('');
  const [books, setBooks] = useState([]);
  const [booksReading, setBooksReading] = useState([]);
  const [booksRead, setBooksRead] = useState([]);

  useEffect(() => {
    const {navigation} = props;
    const user = navigation.getParam('user');

    firebase
      .database()
      .ref('users')
      .child(user.uid)
      .once('value')
      .then((currentUserData) => {
        setCurrentUser(currentUserData.val());
        console.log(currentUserData)
        firebase
          .database()
          .ref('books')
          .child(user.uid)
          .once('value')
          .then((books) => {
            const booksArray = snapshotToArray(books);
            console.log(booksArray)
            setBooks(booksArray);
            setBooksReading(booksArray.filter(b => !b.read));
            setBooksRead(booksArray.filter(b => b.read))
          })
          .catch(err => console.log(err));
      }).catch(err => console.log(err))

  },[])

  addBook = book => {
    let test = false;
    firebase
      .database()
      .ref('books')
      .child(currentUser.uid)
      .orderByChild('name')
      .equalTo(book)
      .once('value')
      .then(result => {
        if(result.exists()){
          alert('already exists');
          return;
        }

        firebase
          .database()
          .ref('books')
          .child(currentUser.uid)
          .push()
          .then((result) => {
            firebase.database()
            .ref('books')
            .child(currentUser.uid)
            .child(result.key)
            .set({name: book, read: false})
          .catch(e => console.log(e))
        }).catch(e => console.log(e))
      });


    setBooks([...books, {name: book, read: false}]);
    setBooksReading([...booksReading, {name: book, read: false}])

  }

  markAsRead = (selectedBook, index) => {
    let newList = books.map(book => {
      if(book.name === selectedBook.name) {
        return {...book, read: true};
      }
      return book;
    });
    setBooks(newList);
    setBooksReading(booksReading.filter(book => book.name !== selectedBook.name));

    setBooksRead(booksRead.concat({name: selectedBook.name, read: true}));
  }

  renderItem = (item, index) => (
    <View style={{height: 50, flexDirection: 'row'}}>
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingLeft: 5
        }}>
        <Text>{item.name}</Text>
      </View>
      {item.read ? (
        <Ionicons name="md-checkmark" color={colors.logoColor} size={30} />
      ):(
      <CustomActionButton
        onPress={() => markAsRead(item, index)}
        style={{backgroundColor: colors.bgSuccess, width: 100}}
      >
          <Text style={{color: 'white'}}>
            Mark as Read
          </Text>
      </CustomActionButton>
      )}
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
        <BookComponent title="Total Books" count={books.length} />
        <BookComponent title="Reading" count={booksReading.length} />
        <BookComponent title="Read" count={booksRead.length} />
      </View>
      <SafeAreaView />
    </View>
  );
}
