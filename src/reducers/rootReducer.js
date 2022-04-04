import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import { productsReducer } from './productsReducer';

export const rootInitValue = {
  products: [],
  loading: [],
  error: [],
  cart: [],
};

export const rootReducer = (state, action) => ({
  products: productsReducer(state.products, action),
  cart: cartReducer(state.cart, action),
  loading: loadingReducer(state.loading, action),
  error: errorReducer(state.error, action),
});
