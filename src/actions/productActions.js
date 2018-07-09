import firebase from 'firebase';
import '@firebase/firestore';
import _ from 'lodash'; 
import Moment from 'moment';

import {
  PRODUCT_UPDATE,
  PRODUCT_ADD_ATTR,
  PRODUCT_REMOVE_ATTR,
  PRODUCT_UPDATE_ATTR,
  PRODUCT_CREATE_RESET,
  CHOOSING_ATTR,
  START_CREATE_PRODUCT,
  UPLOAD_PRODUCT_IMAGE_SUCCESS,
  FINISH_CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_SUCCESS,
  PICKED_PRODUCT,
  FETCH_UPDATING_PRODUCT,
  FINISH_UPDATE_PRODUCT,
  CHANGE_PRODUCT_SUCCESS,
  UPDATE_LIST_SUCCESS,
  DELETE_PRODUCT_COMPLETE,
  START_DELETE_PRODUCT
} from './types';

export const productUpdate = ({ prop, value }) => {
  return {
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  };
}

export const addNewAttr = () => {
  return {
    type: PRODUCT_ADD_ATTR,
    payload: { attrName: 'Thuộc tính', value: '' }
  }
}

export const removeAttr = (index) => {
  return {
    type: PRODUCT_REMOVE_ATTR,
    payload: index
  }
}

export const updateAttr = ({ prop, value, index }) => (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE_ATTR,
    payload: { prop, value, index }
  });
}

export const updateAttrName = ({ prop, value, index }, callback) => (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE_ATTR,
    payload: { prop, value, index }
  });
  callback();
}

export const resetProductCreate = (callback) => (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_RESET });
  callback();
}

export const choosingAttribute = (index, callback) => (dispatch) => {
  dispatch({ type: CHOOSING_ATTR, payload: index });
  callback();
}

export const productCateUpdate = ({ prop, value }, callback) => (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE,
    payload: { prop, value }
  });
  callback();
}

// will working on this later
// because of the limit of expo does not 
// support blob type yet!!
export const uploadImage = (uri) => async dispatch => {
  // try {
  //   dispatch({ type: START_CREATE_PRODUCT });
  //   const { currentUser } = firebase.auth();

  //   let now = Moment();
  //   console.log(now);
  //   // Start upload
  //   const imageRef = await firebase.storage().ref().child(`${currentUser.uid}`).child('images').child(`${now}.jpg`).putString(uri, 'base64');

  //   dispatch({ type: UPLOAD_PRODUCT_IMAGE_SUCCESS, payload: imageRef.downloadURL });
  // } catch (err) {
  //   console.log(err);
  // }
}

export const addNewProductToFireStore = ({ id, name, cate, sell_price, orgin_price, quantity, desc, image, attr }, callback) => (dispatch) => {
  let { currentUser } = firebase.auth();
  try {
    dispatch({ type: START_CREATE_PRODUCT });
    let db = firebase.firestore();

    // create data object
    let data = {
      name: name,
      cate: cate,
      sell_price: sell_price,
      orgin_price: orgin_price,
      quantity: quantity,
      desc: desc,
      image: image,
      attr: attr
    };

    if (id === '') {
      db.collection('users').doc(`${currentUser.uid}`).collection('products').add(data)
        .then((docRef) => {
          let data2 = { ...data, id: docRef.id }
          dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data2 });
          dispatch({ type: FINISH_CREATE_PRODUCT });
          callback();
        });
    } else {
      db.collection('users').doc(`${currentUser.uid}`).collection('products').doc(id).set(data)
        .then(() => {
          let data2 = { ...data, id: id }
          dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data2 });
          dispatch({ type: FINISH_CREATE_PRODUCT });
          callback();
        });
    }
  } catch (err) {
    console.log(err);
    alert("Có lỗi xảy ra, vui lòng xem lại thông tin hoặc thử lại sau!");
    dispatch({ type: FINISH_CREATE_PRODUCT });
  }
}

export const fetchListProduct = () => async dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();

  let data = [];
  db.collection('users').doc(`${currentUser.uid}`).collection('products').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          name: doc.data().name,
          cate: doc.data().cate,
          desc: doc.data().desc,
          image: doc.data().image,
          sell_price: doc.data().sell_price,
          orgin_price: doc.data().orgin_price,
          quantity: doc.data().quantity,
          attr: doc.data().attr,
        })
      });
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Edit Product

export const goToProductDetail = (product, callback) => dispatch => {
  dispatch({ type: PICKED_PRODUCT, payload: product });
  callback();
}

export const goToUpdateProduct = () => dispatch => {
  dispatch({ type: FETCH_UPDATING_PRODUCT });
}

// Update Product
export const updateProductChanges = ({ id, name, cate, sell_price, orgin_price, quantity, desc, image, attr }, callback) => dispatch => {
  let { currentUser } = firebase.auth();
  try {
    dispatch({ type: START_CREATE_PRODUCT });
    let db = firebase.firestore();

    // create data object
    let data = {
      name: name,
      cate: cate,
      sell_price: sell_price,
      orgin_price: orgin_price,
      quantity: quantity,
      desc: desc,
      image: image,
      attr: attr
    };

    db.collection('users').doc(`${currentUser.uid}`).collection('products').doc(id).set(data)
      .then(() => {
        let data2 = { ...data, id: id }
        dispatch({ type: CHANGE_PRODUCT_SUCCESS, payload: data2 });
        dispatch({ type: UPDATE_LIST_SUCCESS, payload: data2 })
        dispatch({ type: FINISH_UPDATE_PRODUCT });
        callback();
      });
  } catch (err) {
    console.log(err);
    alert("Có lỗi xảy ra, vui lòng xem lại thông tin hoặc thử lại sau!");
    dispatch({ type: FINISH_UPDATE_PRODUCT });
  }
}

// Delete Product
export const deleteCurrentProduct = (id, array, callback) => async dispatch => {
  const { currentUser } = firebase.auth();
  let db = firebase.firestore();
  dispatch({ type: START_DELETE_PRODUCT });

  await db.collection('users').doc(`${currentUser.uid}`).collection('products').doc(id).delete()
    .then(() => {
      dispatch({ type: DELETE_PRODUCT_COMPLETE, payload: array });
      callback();
    })
}
