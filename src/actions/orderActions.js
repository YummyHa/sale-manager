import _ from 'lodash';
import update from 'immutability-helper';

import {
  ADD_NEW_ORDER_SUCCESS,
  UPDATE_ORDER_QUANTITY_PLUS,
  UPDATE_ORDER_QUANTITY_MINUS,
  UPDATE_ORDER_QUANTITY,
  UPDATE_ORDER_LIST,
  UPDATE_TOTAL_ORDER_AMOUNT
} from './types';

export const addProductToOrderList = (item, list) => dispatch => {
  let index = _.findIndex(list, (o) => { return o.id == item.id });
  const item2 = update(item, {quantity: {$set: 1}});
  index > -1 ? dispatch({ type: UPDATE_ORDER_QUANTITY_PLUS, payload: index }) : dispatch({ type: ADD_NEW_ORDER_SUCCESS, payload: item2 })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
}

export const updateOrderQuantity = (value, index) => dispatch => {
  if (index > -1) {
    dispatch({ type: UPDATE_ORDER_QUANTITY, payload: { index: index, value: value } });
    dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
  }
}

export const updateOrderQuantityByButton = (type, index) => dispatch => {
  type === 'plus' ? dispatch({ type: UPDATE_ORDER_QUANTITY_PLUS, payload: index }) : dispatch({ type: UPDATE_ORDER_QUANTITY_MINUS, payload: index })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
}

export const removeItemInOrderingList = (list) => dispatch => {
  dispatch({ type: UPDATE_ORDER_LIST, payload: list })
  dispatch({ type: UPDATE_TOTAL_ORDER_AMOUNT });
}
