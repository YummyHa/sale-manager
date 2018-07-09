import firebase from 'firebase';
import '@firebase/firestore';

import {
  ADD_NEW_ORDER_SUCCESS,
  FETCH_ORDER_SUCCESS
} from './types';

export const fetchListOrders = () => dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = [];
  db.collection('users').doc(`${currentUser.uid}`).collection('orders').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          customer: doc.data().customer,
          date: doc.data().date,
          list_detail: doc.data().list_detail,
          total: doc.data().total
        })
      });
      dispatch({ type: FETCH_ORDER_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
}
