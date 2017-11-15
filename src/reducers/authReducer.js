import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL, 
  EMAIL_LOGIN,
  CHECK_LOGIN_FAILED,
  INIT_CHECKING_STATE,
  USER_LOGOUT
} from '../actions/types';

const INITIAL_STATE = { 
  email: '', 
  password: '', 
  user: null, 
  error: '', 
  loading: false, 
  loggedIn: false,
  isChecking: true,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' }; 
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' };
    case EMAIL_LOGIN:
      return { ...state, loading: true };
    case INIT_CHECKING_STATE:
      return { ...state, isChecking: true };
    case CHECK_LOGIN_FAILED:
      return { ...state, isChecking: false, loggedIn: false };
    case EMAIL_LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false, email: '', password: '', loggedIn: true };
    case EMAIL_LOGIN_FAIL: 
      return { ...state, error: 'email hoặc mật khẩu không chính xác', password: '', loading: false };
    case USER_LOGOUT: 
      return { ...state, loggedIn: false };
    default: 
      return state;
  }
}
