import {
  CUSTOMERS_FETCH_SUCCESS,
  CUSTOMERS_ADD_NEW,
  CUSTOMERS_DELETE,
  UPDATE_CUSTOMER_PROPS,
  OPEN_ADD_CUSTOMER_MODAL,
  CLOSE_ADD_CUSTOMER_MODAL,
  ERROR_ADD_CUSTOMER_CHANGED,
  ADDING_NEW_CUSTOMER,
} from '../actions/types';

const INITIAL_STATE = {
  customers: [],
  customerModalVisible: false,
  error_add_customer: '',
  isAddingCustomer: false,
  customerName: '',
  customerAddress: '',
  customerPhone: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMERS_FETCH_SUCCESS:
      return { ...state, customers: action.payload };
    case UPDATE_CUSTOMER_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ADDING_NEW_CUSTOMER:
      return { ...state, isAddingCustomer: true };
    case CUSTOMERS_ADD_NEW:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        customerModalVisible: false,
        error_add_customer: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        isAddingCustomer: false
      };
    case OPEN_ADD_CUSTOMER_MODAL:
      return { ...state, customerModalVisible: true }
    case CLOSE_ADD_CUSTOMER_MODAL:
      return { ...state, customerModalVisible: false, error_add_customer: '' }
    case ERROR_ADD_CUSTOMER_CHANGED:
      return { ...state, error_add_customer: action.payload }
    case CUSTOMERS_DELETE:
      return { ...state, customers: action.payload }
    default:
      return state;
  }
};