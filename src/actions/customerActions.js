import firebase from 'firebase';
import '@firebase/firestore';

import {
  CUSTOMERS_FETCH_SUCCESS,
  CUSTOMERS_ADD_NEW,
  CUSTOMERS_DELETE,
  UPDATE_CUSTOMER_PROPS,
  OPEN_ADD_CUSTOMER_MODAL,
  CLOSE_ADD_CUSTOMER_MODAL,
  ERROR_ADD_CUSTOMER_CHANGED,
  ADDING_NEW_CUSTOMER,
} from './types';

export const customerFetch = () => async dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = [];
  db.collection('users').doc(`${currentUser.uid}`).collection('customers').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, name: doc.data().name, address: doc.data().address, phone: doc.data().phone })
      });
      dispatch({ type: CUSTOMERS_FETCH_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
}

export const customerUpdateProps = ({ prop, value }) => {
  return {
    type: UPDATE_CUSTOMER_PROPS,
    payload: {prop, value}
  };
}

export const openAddCustomerModal = () => {
  return {
    type: OPEN_ADD_CUSTOMER_MODAL
  }
}

export const closeAddCustomerModal = () => {
  return {
    type: CLOSE_ADD_CUSTOMER_MODAL
  }
}

export const addNewCustomer = ({ name, address, phone }) => (dispatch) => {
  dispatch({ type: ADDING_NEW_CUSTOMER });

  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = {
    name: name, 
    address: address, 
    phone: phone
  };

  db.collection('users').doc(`${currentUser.uid}`).collection('customers').add(data)
    .then((docRef) => {
      let data2 = { id: docRef.id, name: name, address: address, phone: phone }
      dispatch({ type: CUSTOMERS_ADD_NEW, payload: data2 });
    })
    .catch((err) => {
      console.log(err);
    })
}

export const addCustomerError = (error) => {
  return {
    type: ERROR_ADD_CUSTOMER_CHANGED,
    payload: error
  }
}

export const deleteCustomer = (id, array) => (dispatch) => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  db.collection('users').doc(`${currentUser.uid}`).collection('customers').doc(id).delete()
    .then(() => {
      dispatch({ type: CUSTOMERS_DELETE, payload: array });
    })
}
