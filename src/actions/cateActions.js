import firebase from 'firebase';
import '@firebase/firestore';

import {
  FETCH_CATE_SUCCESS,
  CATE_NAME_CHANGED,
  CATE_ADD_NEW_SUCCESS,
  OPEN_ADD_CATE_DIALOG,
  CLOSE_ADD_CATE_DIALOG,
  ERROR_ADD_CATE_CHANGED,
  ADDING_NEW_CATE,
  REMOVE_CATE
} from './types';

export const cateFetch = () => async dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = [];
  db.collection('users').doc(`${currentUser.uid}`).collection('categories').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.data().name })
      });
      dispatch({ type: FETCH_CATE_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
}

export const cateNameChange = (text) => {
  return {
    type: CATE_NAME_CHANGED,
    payload: text
  };
}

export const openAddCateModal = () => {
  return {
    type: OPEN_ADD_CATE_DIALOG
  }
}

export const closeAddCateModal = () => {
  return {
    type: CLOSE_ADD_CATE_DIALOG
  }
}

export const addNewCate = (value) => (dispatch) => {
  dispatch({ type: ADDING_NEW_CATE });

  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = {
    name: value
  };

  db.collection('users').doc(`${currentUser.uid}`).collection('categories').add(data)
    .then((docRef) => {
      let data2 = { id: docRef.id, name: value }
      dispatch({ type: CATE_ADD_NEW_SUCCESS, payload: data2 });
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addCateError = (error) => {
  return {
    type: ERROR_ADD_CATE_CHANGED,
    payload: error
  }
}

export const deleteCate = (id, array) => (dispatch) => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  db.collection('users').doc(`${currentUser.uid}`).collection('categories').doc(id).delete()
    .then(() => {
      dispatch({ type: REMOVE_CATE, payload: array });
    })
}
