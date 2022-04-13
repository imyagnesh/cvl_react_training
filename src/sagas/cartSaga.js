import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';

const getProducts = (productId) => (state) =>
  state.products.find((x) => x.id === productId);

function* loadCart() {
  try {
    const res = yield call(axiosInstance.get, 'cart');
    yield put({ type: 'LOAD_CART_SUCCESS', payload: res.data });
  } catch (error) {
    yield put({
      type: 'LOAD_CART_FAIL',
      payload: { error },
    });
  }
}

function* addCartItem({ payload: { loadingId } }) {
  try {
    const res = yield call(axiosInstance.post, 'cart', {
      productId: loadingId,
      quantity: 1,
    });
    yield put({
      type: 'ADD_CART_SUCCESS',
      payload: { ...res.data, loadingId },
    });
  } catch (error) {
    yield put({
      type: 'ADD_CART_FAIL',
      payload: { error, loadingId },
    });
  }
}

function* updateCartRequest({ payload: { cartItem } }) {
  try {
    const products = yield select(getProducts(cartItem.productId));

    console.log(products);

    const res = yield call(axiosInstance.put, `cart/${cartItem.id}`, cartItem);

    yield put({
      type: 'UPDATE_CART_SUCCESS',
      payload: { ...res.data, loadingId: cartItem.productId },
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_CART_FAIL',
      payload: { error, loadingId: cartItem.productId },
    });
  }
}

function* deleteCartRequest({ payload: { cartItem } }) {
  try {
    yield call(axiosInstance.delete, `cart/${cartItem.id}`);
    yield put({
      type: 'DELETE_CART_SUCCESS',
      payload: { ...cartItem, loadingId: cartItem.productId },
    });
  } catch (error) {
    yield put({
      type: 'DELETE_CART_FAIL',
      payload: { error, loadingId: cartItem.productId },
    });
  }
}

function* loadCartRequest() {
  yield takeEvery('LOAD_CART_REQUEST', loadCart);
}

function* addCartItemRequest() {
  yield takeLatest('ADD_CART_REQUEST', addCartItem);
}

function* updateCartItemRequest() {
  yield takeLatest('UPDATE_CART_REQUEST', updateCartRequest);
}

function* deleteCartItemRequest() {
  yield takeLatest('DELETE_CART_REQUEST', deleteCartRequest);
}

export default function* cartSaga() {
  yield all([
    loadCartRequest(),
    addCartItemRequest(),
    updateCartItemRequest(),
    deleteCartItemRequest(),
  ]);
}
