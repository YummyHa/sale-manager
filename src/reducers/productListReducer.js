import {
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  isLoadingProducts: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload, isLoadingProducts: false }
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, products: [...state.products, action.payload] }
    default:
      return state;
  }
};
