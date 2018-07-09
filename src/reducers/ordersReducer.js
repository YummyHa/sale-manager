import update from 'immutability-helper';
import _ from 'lodash';

import {
  ADD_NEW_ORDER_LIST_SUCCESS,
  UPDATE_ORDER_QUANTITY,
  UPDATE_ORDER_QUANTITY_PLUS,
  UPDATE_ORDER_QUANTITY_MINUS,
  UPDATE_ORDER_LIST,
  UPDATE_TOTAL_ORDER_AMOUNT,
  UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST,
  OPEN_PAY_MODAL,
  CLOSE_PAY_MODAL,
  DISCOUNT_CHANGED,
  DISCOUNT_TOTAL,
  PAID_MONEY_CHANGED,
  CHANGE_CHANGED,
  UPDATE_ORGIN_TOTAL,
  FINISH_ADD_ORDER,
  ADDING_NEW_ORDER
} from '../actions/types';

const INITIAL_STATE = {
  ordering_list: [],
  ordering_total_items: 0,
  customer: 'Khách lẻ',
  total: 0,
  payModalVisible: false,
  discount: 0,
  change: 0,
  paidmoney: 0,
  real_total: 0,
  isAddingOrders: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER_LIST_SUCCESS:
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
      return { ...state, total: s, real_total: s }
    case UPDATE_CUSTOMER_NAME_IN_ORDERING_LIST:
      return { ...state, customer: action.payload }
    case OPEN_PAY_MODAL: 
      return { ...state, payModalVisible: true }
    case CLOSE_PAY_MODAL:
      return { ...state, payModalVisible: false }
    case DISCOUNT_CHANGED:
      return { ...state, discount: action.payload }
    case PAID_MONEY_CHANGED:
      return { ...state, paidmoney: action.payload }
    case DISCOUNT_TOTAL: 
      let t = state.real_total - state.real_total*(state.discount/100);
      t = Math.round(t);
      return { ...state, total: t }
    case CHANGE_CHANGED:
      let change = state.paidmoney - state.total;
      return { ...state, change: change}
    case UPDATE_ORGIN_TOTAL:
      return { ...state, total: action.payload }
    case ADDING_NEW_ORDER: 
      return { ...state, isAddingOrders: true }
    case FINISH_ADD_ORDER:
      return INITIAL_STATE;
    default:
      return state;
  }
};