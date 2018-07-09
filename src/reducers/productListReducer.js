import _ from 'lodash';
import {
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  UPDATE_LIST_SUCCESS,
  DELETE_PRODUCT_COMPLETE,
  START_DELETE_PRODUCT
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  isLoadingProducts: true,
  isDeletingProduct: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, isLoadingProducts: false }
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, products: [...state.products, action.payload] }
    case UPDATE_LIST_SUCCESS:
      return { ...state, products: state.products.map(product => (product.id === action.payload.id) ? action.payload : product) }
    case START_DELETE_PRODUCT:
      return { ...state, isDeletingProduct: true }
    case DELETE_PRODUCT_COMPLETE:
      return { ...state, products: action.payload, isDeletingProduct: false }
    default:
      return state;
  }
}; 
