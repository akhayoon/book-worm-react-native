import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase/app';
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";
require("firebase/database");
import {useDispatch, useSelector} from 'react-redux';


import CustomActionButton from "../components/CustomActionButton";
import ListEmptyComponent from "../components/ListEmptyComponent";
import ListItem from "../components/ListItem";
import colors from '../assets/colors';
import { snapshotToArray } from '../helpers/firebaseHelpers';

function HomeScreen(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [textInputData, setTextInputData] = useState('');
  this.textInputRef = React.createRef();
  const books = useSelector(state => state.books.books);
  const isLoadingBooks = useSelector(state => state.books.isLoadingBooks);
  const dispatch = useDispatch();
  const loadBooksIntoStore = books => dispatch({type: 'LOAD_BOOKS_FROM_SERVER', payload: books});
  const markAsReadInStore = book => dispatch({type: 'MARK_BOOK_AS_READ', payload: book});
  const addBookToStore = book => dispatch({type: 'ADD_BOOK', payload: book});
  const toggleIsLoadingBooks = bool => dispatch({type: 'TOGGLE_IS_LOADING_BOOKS', payload: bool})

  useEffect(() => {
    const {navigation} = props;
    const user = navigation.getParam('user');
    loadBooks(user);

  },[])

  loadBooks = async (user) => {
    try{
      toggleIsLoadingBooks(true);
      const currentUserData = await firebase
        .database()
        .ref('users')
        .child(user.uid)
        .once('value');

      setCurrentUser(currentUserData.val());

      const booksFromServer = await firebase
        .database()
        .ref('books')
        .child(user.uid)
        .once('value');

        const booksArray = snapshotToArray(booksFromServer);
        loadBooksIntoStore(booksArray.reverse());
        toggleIsLoadingBooks(false);
      
    } catch(e) {
      console.log(e);
      toggleIsLoadingBooks(false);
    }
  }

  addBook = async () => {
    try{
      const book = textInputData;
      toggleIsLoadingBooks(true);
      const snapshot = await firebase
        .database()
        .ref('books')
        .child(currentUser.uid)
        .orderByChild('name')
        .equalTo(book)
        .once('value');

      if(snapshot.exists()) {
        alert('already exists');
        return;
      }

      const key = await firebase
        .database()
        .ref('books')
        .child(currentUser.uid)
        .push().key;
      
      await firebase.database()
        .ref('books')
        .child(currentUser.uid)
        .child(key)
        .set({name: book, read: false});

      addBookToStore({name: book, read: false, key});
      toggleIsLoadingBooks(false);

      setTextInputData('');
      this.textInputRef.setNativeProps({text: ''});
    } catch(e) {
      console.log(error);
      toggleIsLoadingBooks(false);
    }
  }

  markAsRead = async(selectedBook, index) => {
    try{
      toggleIsLoadingBooks(true);
      await firebase.database().ref('books').child(currentUser.uid).child(selectedBook.key).update({read: true});
      markAsReadInStore(selectedBook);
      toggleIsLoadingBooks(false);
    } catch(e) {
      console.log(e);
      toggleIsLoadingBooks(false);
    }
  }

  renderItem = (item, index) => {
    const swipeoutButtons = [
      {
        text: 'Delete',
        component: (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons name="md-trash" size={24} color={colors.txtWhite} />
          </View>
        ),
        backgroundColor: colors.bgDelete,
        onPress: () => alert('delete book')
      }
    ];

    if(!item.read) {
      swipeoutButtons.unshift({
        text: 'Mark Read',
        component: (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: colors.txtWhite}}>Mark as Read</Text>
          </View>
        ),
        backgroundColor: colors.bgSuccessDark,
        onPress: () => alert('mark read')
      })
    } else {
      swipeoutButtons.unshift({
        text: 'Mark Unread',
        component: (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: colors.txtWhite}}>Mark Unread</Text>
          </View>
        ),
        backgroundColor: colors.bgUnread,
        onPress: () => alert('mkar unread')
      })
    }
    return (
      <Swipeout
        backgroundColor={colors.bgMain}
        style={{marginHorizontal: 5, marginVertical: 5}}
        right={swipeoutButtons}
        autoClose={true}
        >
        <ListItem item={item} marginVertical={0}>
          {item.read ? (
            <Ionicons name="md-checkmark" color={colors.logoColor} size={30} />
          ) : (
              <CustomActionButton
                onPress={() => markAsRead(item, index)}
                style={{ backgroundColor: colors.bgSuccess, width: 100 }}
              >
                <Text style={{ color: colors.txtWhite }}>
                  Mark as Read
              </Text>
              </CustomActionButton>
            )}
        </ListItem>
      </Swipeout>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ flex: 1 }}>
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
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Book Name"
            placeholderTextColor={colors.txtPlaceholder}
            onChangeText={(text) => setTextInputData(text)}
            ref={component => this.textInputRef = component}
          />
        </View>
        
        <FlatList
          data={books}
          renderItem={({item}, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={!isLoadingBooks && <ListEmptyComponent text="No books " />}
        />

        {/* <Animatable.View animation={textInputData.length > 0 ? 'slideInRight' : 'slideOutRight'}> */}
        {textInputData.length > 0
          ?
          <CustomActionButton
            style={{ backgroundColor: colors.bgPrimary, borderRadius: 25 }}
            position="right"
            onPress={addBook}
          >
            <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
          </CustomActionButton>
          : null
        }
        {/* </Animatable.View> */}
      </View>
      <SafeAreaView />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    margin: 5
  },
  textInput: {
    flex: 1,
    width: 50,
    fontSize: 22,
    backgroundColor: 'transparent',
    borderColor: colors.ListItembg,
    paddingLeft: 5,
    borderBottomWidth: 5,
    color: colors.txtWhite
  }
});