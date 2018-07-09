import update from 'immutability-helper';
import _ from 'lodash';

import {
  FETCH_ORDER_SUCCESS,
  ADD_NEW_ORDER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDER_SUCCESS:
      return { ...state, orders: action.payload }
    case ADD_NEW_ORDER_SUCCESS: 
      return { ...state, orders: [...state.orders, action.payload]}
    default:
      return state;
  }
};