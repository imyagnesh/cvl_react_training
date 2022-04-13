import { all, fork } from 'redux-saga/effects';
import productsSaga from './productsSaga';
import cartSaga from './cartSaga';

export default function* rootSaga() {
  yield all([fork(productsSaga), fork(cartSaga)]);
}
