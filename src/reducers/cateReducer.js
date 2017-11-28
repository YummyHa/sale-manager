import {
  FETCH_CATE_SUCCESS,
  CATE_NAME_CHANGED,
  CATE_ADD_NEW_SUCCESS,
  OPEN_ADD_CATE_DIALOG,
  CLOSE_ADD_CATE_DIALOG,
  ERROR_ADD_CATE_CHANGED,
  ADDING_NEW_CATE,
  REMOVE_CATE
} from '../actions/types';

const INITIAL_STATE = {
  cate_list: [],
  cateModalVisible: false,
  cate_name: '',
  error_add_cate: '',
  isAddingCate: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATE_SUCCESS:
      return { ...state, cate_list: action.payload };
    case CATE_NAME_CHANGED:
      return { ...state, cate_name: action.payload };
    case ADDING_NEW_CATE:
      return { ...state, isAddingCate: true };
    case CATE_ADD_NEW_SUCCESS:
      return {
        ...state,
        cate_list: [...state.cate_list, action.payload],
        cateModalVisible: false,
        error_add_cate: '',
        cate_name: '',
        isAddingCate: false
      };
    case OPEN_ADD_CATE_DIALOG:
      return { ...state, cateModalVisible: true }
    case CLOSE_ADD_CATE_DIALOG:
      return { ...state, cateModalVisible: false, error_add_cate: '' }
    case ERROR_ADD_CATE_CHANGED:
      return { ...state, error_add_cate: action.payload }
    case REMOVE_CATE:
      return { ...state, cate_list: action.payload }
    default:
      return state;
  }
};
