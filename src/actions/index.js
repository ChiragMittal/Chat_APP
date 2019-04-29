import axios from 'axios'
import * as ACTION from '../constants'
import { postToBooks ,deleteFromBooks ,getFromBooks ,editToBooks} from "../APIs/book";
import {addUser , loginUser,getMe} from "../APIs/auth"

export const getProfile = (id) => {
    return ({
        type: ACTION.PROFILE,
            id
    })
};

export const beginGetProfile = id => {
    return dispatch => {
      return getMe(id).then(({ data }) => dispatch(getProfile(data)));
    };
  };

export const loginUserData = userData => ({
    type: ACTION.LOGIN,
    userData
  });

  export const beginLogin = userData => dispatch =>{
    return loginUser(userData).then(({data}) => dispatch(loginUserData(data)))
}    

export const logout = () => ({
    type: ACTION.LOGOUT,
  });



export const registerUser = userData => ({
    type: ACTION.REGISTER,
    userData
  });
  
export const beginRegister = userData => dispatch =>{
    return addUser(userData).then(({data}) => dispatch(registerUser(data)))
}  

export const beginAddBook = (book = {}) => {
    return dispatch => {
      return postToBooks(book).then(({ data }) => dispatch(addBook(data)));
    };
  };

export const addBook = (data) => {
    return ({
        type: ACTION.ADD_BOOK,
        
            data: data
        
    })
}

export function beginDeleteBook (book) {
    return dispatch => {
      return deleteFromBooks(book).then(({ data }) =>
        dispatch(deleteBook(data))
      );
    };
  };

export const deleteBook = (id) => {
    return ({
        type: ACTION.DELETE_BOOK,
        
            id: id
        
    })
}

export const editBook = (id,shelfStatus,favourite) => {
    return ({
        type: ACTION.EDIT_BOOK,
       
            id,
            shelfStatus,
            favourite
        
    })
};

export const beginEditBook = book => {
    return dispatch => {
      return editToBooks(book).then(({ data }) => dispatch(editBook(data)));
    };
  };

export const beginGetBooks = () => {
    return dispatch => {
      return getFromBooks().then(({ data }) => dispatch(getBooks(data)));
    };
  };
  
  export const getBooks = books => ({
    type: ACTION.SET_BOOKS,
    books
  });

  export const addToFavourites = (data) => {
    return ({
        type: ACTION.ADD_TO_FAVOURITES,
        
            data: data
        
    })
}




