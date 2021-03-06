import firebase from 'firebase';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  EMAIL_LOGIN_SUCCESS, 
  EMAIL_LOGIN_FAIL, 
  EMAIL_LOGIN,
  CHECK_LOGIN_FAILED,
  INIT_CHECKING_STATE,
  USER_LOGOUT
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  }
}

export const checkLogin = () => (dispatch) => {
  dispatch({ type: INIT_CHECKING_STATE });
  firebase.auth().onAuthStateChanged(user => {
    if (user) {       
      dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: CHECK_LOGIN_FAILED });
    }
  })
}

export const emailLogin = ({ email, password }) => (dispatch) => {    
  dispatch({ type: EMAIL_LOGIN });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
      dispatch({ type: EMAIL_LOGIN_FAIL });
    });
}

export const userLogout = () => (dispatch) => {
  firebase.auth().signOut()
    .then(() => {
      dispatch({ type: USER_LOGOUT });
    }); 
}
