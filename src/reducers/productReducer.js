import update from 'immutability-helper';

import {
  PRODUCT_UPDATE,
  PRODUCT_ADD_ATTR,
  PRODUCT_REMOVE_ATTR,
  PRODUCT_UPDATE_ATTR,
  PRODUCT_CREATE_RESET,
  CHOOSING_ATTR,
  START_CREATE_PRODUCT,
  FINISH_CREATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
  PICKED_PRODUCT,
  FETCH_UPDATING_PRODUCT,
  FINISH_UPDATE_PRODUCT,
  CHANGE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_COMPLETE,
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  name: '',
  cate: '',
  desc: '',
  image: '',
  sell_price: '0',
  orgin_price: '0',
  quantity: '0',
  attr: [],
  choosing_index: null,
  isProductSpinnerLoading: false,
  isUpdateProduct: false,
  choosingProduct: {},
  isDeletingProduct: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_RESET:
      return INITIAL_STATE;
    case PRODUCT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case PRODUCT_ADD_ATTR:
      return { ...state, attr: [...state.attr, action.payload] }
    case PRODUCT_REMOVE_ATTR:
      return { ...state, attr: [...state.attr.slice(0, action.payload), ...state.attr.slice(action.payload + 1)] }
    case PRODUCT_UPDATE_ATTR:
      return update(state, {
        attr: {
          [action.payload.index]: {
            [action.payload.prop]: { $set: action.payload.value }
          }
        }
      });
    case CHOOSING_ATTR:
      return { ...state, choosing_index: action.payload }
    case START_CREATE_PRODUCT:
      return { ...state, isProductSpinnerLoading: true }
    case UPLOAD_PRODUCT_IMAGE_SUCCESS:
      return { ...state, image: action.payload }
    case FINISH_CREATE_PRODUCT:
      return INITIAL_STATE;
    case CHANGE_PRODUCT_SUCCESS:
      return { ...state, choosingProduct: action.payload }   
    case FINISH_UPDATE_PRODUCT:
      return {
        ...state, 
        id: '',
        name: '',
        cate: '',
        desc: '',
        image: '',
        sell_price: '0',
        orgin_price: '0',
        quantity: '0',
        attr: [],
        choosing_index: null,
        isProductSpinnerLoading: false,
        isUpdateProduct: false
      }
    case PICKED_PRODUCT:
      return { ...state, choosingProduct: action.payload }
    case FETCH_UPDATING_PRODUCT:
      return { ...state, isUpdateProduct: true }
    default:
      return state;
  }
};
