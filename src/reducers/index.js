import { combineReducers } from 'redux';

import AuthReducer from '../screens/Login/reducer';

export default combineReducers({
  auth: AuthReducer
});
