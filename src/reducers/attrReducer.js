import {  
  FETCH_ATTR_SUCCESS,
  ATTR_ADD_NEW_SUCCESS,
  ATTR_NAME_CHANGED,
  OPEN_ADD_ATTR_DIALOG,
  CLOSE_ADD_ATTR_DIALOG,
  ERROR_ADD_ATTR_CHANGED,
  ADDING_NEW_ATTR,
  REMOVE_ATTR
} from '../actions/types';

const INITIAL_STATE = {
  attr_list: [],
  modalVisible: false,
  attr_name: '',
  error_add_attr: '',
  isAdding: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTR_SUCCESS:
      return { ...state, attr_list: action.payload };
    case ATTR_NAME_CHANGED: 
      return { ...state, attr_name: action.payload };
    case ADDING_NEW_ATTR: 
      return { ...state, isAdding: true };
    case ATTR_ADD_NEW_SUCCESS:
      return { ...state, 
        attr_list: [ ...state.attr_list, action.payload ], 
        modalVisible: false, 
        error_add_attr: '', 
        attr_name: '',
        isAdding: false 
      };
    case OPEN_ADD_ATTR_DIALOG:
      return { ...state, modalVisible: true }
    case CLOSE_ADD_ATTR_DIALOG:
      return { ...state, modalVisible: false, error_add_attr: '' }
    case ERROR_ADD_ATTR_CHANGED:
      return { ...state, error_add_attr: action.payload }
    case REMOVE_ATTR:
      return { ...state, attr_list: action.payload }
    default:
      return state;
  }
};