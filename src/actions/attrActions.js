import firebase from 'firebase';
import '@firebase/firestore';

import {
  FETCH_ATTR_SUCCESS,
  ATTR_NAME_CHANGED,
  ATTR_ADD_NEW_SUCCESS,
  OPEN_ADD_ATTR_DIALOG,
  CLOSE_ADD_ATTR_DIALOG,
  ERROR_ADD_ATTR_CHANGED,
  ADDING_NEW_ATTR,
  REMOVE_ATTR
} from './types';

export const attributeFetch = () => async dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = [];
  db.collection('users').doc(`${currentUser.uid}`).collection('attributes').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.data().name })     
      });
      dispatch({ type: FETCH_ATTR_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });   
}

export const attrNameChange = (text) => {
  return {
    type: ATTR_NAME_CHANGED,
    payload: text
  };
}

export const openAddAttrModal = () => {
  return {
    type: OPEN_ADD_ATTR_DIALOG
  }
}

export const closeAddAttrModal = () => {
  return {
    type: CLOSE_ADD_ATTR_DIALOG
  }
}

export const addNewAttribute = (value) => (dispatch) => {
  dispatch({ type: ADDING_NEW_ATTR });

  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = {
    name: value
  };

  db.collection('users').doc(`${currentUser.uid}`).collection('attributes').add(data)
    .then((docRef) => {
      let data2 = { id: docRef.id, name: value }
      dispatch({ type: ATTR_ADD_NEW_SUCCESS, payload: data2 });
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addAttrError = (error) => {
  return {
    type: ERROR_ADD_ATTR_CHANGED,
    payload: error
  }
}

export const deleteAttr = (id, array) => (dispatch) => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  db.collection('users').doc(`${currentUser.uid}`).collection('attributes').doc(id).delete()
    .then(() => {
      dispatch({ type: REMOVE_ATTR, payload: array });
    })
}
