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
  UPLOAD_PRODUCT_IMAGE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  code: '',
  name: '',
  cate: '',
  desc: '',
  image: '',
  img_local_uri: '',
  img_base64_string: null,
  sell_price: '0',
  orgin_price: '0',
  quantity: '0',
  attr: [],
  choosing_index: null,
  isProductSpinnerLoading: false,
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
    default:
      return state;
  }
};
