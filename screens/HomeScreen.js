import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase/app';
import * as Animatable from "react-native-animatable";
require("firebase/database");
import {connect} from 'react-redux';


import CustomActionButton from "../components/CustomActionButton";
import ListEmptyComponent from "../components/ListEmptyComponent";
import ListItem from "../components/ListItem";
import colors from '../assets/colors';
import { snapshotToArray } from '../helpers/firebaseHelpers';

function HomeScreen(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [textInputData, setTextInputData] = useState('');
  this.textInputRef = React.createRef();

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
        firebase
          .database()
          .ref('books')
          .child(user.uid)
          .once('value')
          .then((books) => {
            const booksArray = snapshotToArray(books);
            props.loadBooks(booksArray.reverse());
          })
          .catch(err => console.log(err));
      }).catch(err => console.log(err))

  },[])

  addBook = async () => {
    try{
      const book = textInputData;
      
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

      props.addBook({name: book, read: false, key});

      setTextInputData('');
      this.textInputRef.setNativeProps({text: ''});
    } catch(e) {
      console.log(error);
    }
  }

  markAsRead = async(selectedBook, index) => {
    try{
      await firebase.database().ref('books').child(currentUser.uid).child(selectedBook.key).update({read: true});
      props.markBookAsRead(selectedBook);
    } catch(e) {
      console.log(e);
    }
  }

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
    <View style={{ flex: 1, backgroundColor: colors.bgMain}}>
      <SafeAreaView />
      <View style={{ flex: 1 }}>
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
          data={props.books}
          renderItem={({item}, index) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<ListEmptyComponent text="No books" />}
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

const mapStateToProps = state => {
  return {
    ...state.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: books => dispatch({type: 'LOAD_BOOKS_FROM_SERVER', payload: books}),
    markBookAsRead: book => dispatch({type: 'MARK_BOOK_AS_READ', payload: book}),
    addBook: book => dispatch({type: 'ADD_BOOK', payload: book})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
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