import _ from 'lodash';
import update from 'immutability-helper';
import Moment from 'moment';
import firebase from 'firebase';
import '@firebase/firestore';

import {
  ADD_NEW_ORDER_LIST_SUCCESS,
  UPDATE_ORDER_QUANTITY_PLUS,
  UPDATE_ORDER_QUANTITY_MINUS,
  UPDATE_ORDER_QUANTITY,
  UPDATE_ORDER_LIST,
  UPDATE_TOTAL_ORDER_AMOUNT,
  UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST,
  OPEN_PAY_MODAL,
  CLOSE_PAY_MODAL,
  DISCOUNT_CHANGED,
  DISCOUNT_TOTAL,
  CHANGE_CHANGED,
  PAID_MONEY_CHANGED,
  UPDATE_ORGIN_TOTAL,
  ADDING_NEW_ORDER,
  ADD_NEW_ORDER_SUCCESS,
  FINISH_ADD_ORDER
} from './types';

export const addProductToOrderList = (item, list) => dispatch => {
  let index = _.findIndex(list, (o) => { return o.id == item.id });
  let data = {
    id: item.id,
    quantity: 1,
    name: item.name,
    sell_price: item.sell_price,
  };
  index > -1 ? dispatch({ type: UPDATE_ORDER_QUANTITY_PLUS, payload: index }) : dispatch({ type: ADD_NEW_ORDER_LIST_SUCCESS, payload: data })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
  dispatch({ type: CHANGE_CHANGED })
}

export const updateOrderQuantity = (value, index) => dispatch => {
  if (index > -1) {
    dispatch({ type: UPDATE_ORDER_QUANTITY, payload: { index: index, value: value } });
    dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
    dispatch({ type: CHANGE_CHANGED })
  }
}

export const updateOrderQuantityByButton = (type, index) => dispatch => {
  type === 'plus' ? dispatch({ type: UPDATE_ORDER_QUANTITY_PLUS, payload: index }) : dispatch({ type: UPDATE_ORDER_QUANTITY_MINUS, payload: index })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
  dispatch({ type: CHANGE_CHANGED })
}

export const removeItemInOrderingList = (list) => dispatch => {
  dispatch({ type: UPDATE_ORDER_LIST, payload: list })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
  dispatch({ type: CHANGE_CHANGED })
}

export const updateCustomerNameInOrderingList = (value, callback) => dispatch => {
  dispatch({ type: UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST, payload: value });
  callback();
}

export const closePayModal = () => dispatch => {
  dispatch({ type: CLOSE_PAY_MODAL })
}

export const openPayModal = () => dispatch => {
  dispatch({ type: OPEN_PAY_MODAL })
}

export const discountChange = (value) => dispatch => {
  dispatch({ type: DISCOUNT_CHANGED, payload: value }) 
  dispatch({ type: DISCOUNT_TOTAL })
  dispatch({ type: CHANGE_CHANGED })
}

export const updateOrginTotal = (value) => dispatch => {
  dispatch({ type: UPDATE_ORGIN_TOTAL, payload: value })
  dispatch({ type: CHANGE_CHANGED })
}

export const customerPaidChanged = (value) => dispatch => {
  dispatch({ type: PAID_MONEY_CHANGED, payload: value })
  dispatch({ type: CHANGE_CHANGED })
}

export const afterChangeTotalAgain = () => dispatch => {
  dispatch({ type: CHANGE_CHANGED })
}

export const addNewOrder = ({ customer, ordering_list, total }, callback) => async dispatch => {
  dispatch({ type: ADDING_NEW_ORDER });

  const { currentUser } = firebase.auth();
  let db = firebase.firestore();
  let now = Moment().format();
  let data = {
    customer: customer,
    list_detail: ordering_list,
    date: now,
    total: total
  };

  db.collection('users').doc(`${currentUser.uid}`).collection('orders').add(data)
    .then((docRef) => {
      let data2 = { ...data, id: docRef.id }
      dispatch({ type: ADD_NEW_ORDER_SUCCESS, payload: data2 });
      dispatch({ type: FINISH_ADD_ORDER });
      callback();
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FINISH_ADD_ORDER });
      alert('Có lỗi xảy ra!!');
      callback();
    });
  
}
