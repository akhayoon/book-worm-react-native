import {createStore, combineReducers} from 'redux';
import booksReducer from '../reducers/booksReducer';

const store = createStore(combineReducers({
  books: booksReducer
}));

export default store;