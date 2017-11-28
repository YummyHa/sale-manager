import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import ProductReducer from './productReducer';
import attrReducer from './attrReducer';
import cateReducer from './cateReducer';
import productListReducer from './productListReducer';

export default combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  attr: attrReducer,
  cate: cateReducer,
  list_product: productListReducer,
});
