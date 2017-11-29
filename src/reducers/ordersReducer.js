import update from 'immutability-helper';
import _ from 'lodash';

import {
  ADD_NEW_ORDER_SUCCESS,
  UPDATE_ORDER_QUANTITY,
  UPDATE_ORDER_QUANTITY_PLUS,
  UPDATE_ORDER_QUANTITY_MINUS,
  UPDATE_ORDER_LIST,
  UPDATE_TOTAL_ORDER_AMOUNT,
  UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  ordering_list: [],
  ordering_total_items: 0,
  customer: 'Khách lẻ',
  total: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER_SUCCESS:
      return { ...state, ordering_list: [...state.ordering_list, action.payload], ordering_total_items: state.ordering_total_items+1 }
    case UPDATE_ORDER_QUANTITY_PLUS:
      return update(state, {
        ordering_list: {
          [action.payload]: {
            ['quantity']: { $set: state.ordering_list[action.payload].quantity + 1 }
          }
        }
      });
    case UPDATE_ORDER_QUANTITY_MINUS:
      return update(state, {
        ordering_list: {
          [action.payload]: {
            ['quantity']: { $set: state.ordering_list[action.payload].quantity - 1 }
          }
        }
      });
    case UPDATE_ORDER_QUANTITY:
      return update(state, {
        ordering_list: {
          [action.payload.index]: {
            ['quantity']: { $set: action.payload.value }
          }
        }
      });
    case UPDATE_ORDER_LIST: 
      return { ...state, ordering_list: action.payload, ordering_total_items: state.ordering_total_items - 1 }
    case UPDATE_TOTAL_ORDER_AMOUNT:
      let s = 0;
      _.forEach(state.ordering_list, value => {
        s += value.sell_price * value.quantity;
      });
      return { ...state, total: s }
    case UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST:
      return { ...state, customer: action.payload }
    default:
      return state;
  }
};