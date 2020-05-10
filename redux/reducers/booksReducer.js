const initialState = {
  books: [],
  booksReading: [],
  booksRead: [],
  isLoadingBooks: true
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOOKS_FROM_SERVER':
      return {
        ...state,
        books: action.payload,
        booksReading: action.payload.filter(b => !b.read),
        booksRead: action.payload.filter(b => b.read)
      }
    case 'ADD_BOOK':
      return {
        ...state,
        books: [action.payload, ...state.books],
        booksReading: [ action.payload, ...state.booksReading],
      }
    case 'MARK_BOOK_AS_READ':
      return {
        ...state,
        books: state.books.map(book => {
          if (book.name === action.payload.name) {
            return { ...book, read: true }
          }
          return book;
        }),
        booksRead: [...state.booksRead, action.payload],
        booksReading: state.booksReading.filter(b => b.name !== action.payload.name)
      }
      case 'MARK_BOOK_AS_UNREAD':
        return {
          ...state,
          books: state.books.map(book => {
            if (book.name === action.payload.name) {
              return { ...book, read: false }
            }
            return book;
          }),
          booksRead: state.booksRead.filter(b => b.name !== action.payload.name),
          booksReading: [...state.booksReading, action.payload]
        }
      case 'DELETE_BOOK':
        console.log(action.payload.name);
        return {
          ...state,
          books: state.books.filter(b => b.name !== action.payload.name),
          booksRead: state.booksRead.filter(b => b.name !== action.payload.name),
          booksReading: state.booksReading.filter(b => b.name !== action.payload.name)
        }
      case 'TOGGLE_IS_LOADING_BOOKS':
        return {
          ...state,
          isLoadingBooks: action.payload
        }
    default:
      return state;
  }
}

export default books;