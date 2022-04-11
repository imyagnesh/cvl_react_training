import axiosInstance from '../utils/axiosInstance';

export const loadCartAction = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LOAD_CART_REQUEST',
      payload: { message: 'Loading Products' },
    });
    const res = await axiosInstance.get('cart');
    dispatch({ type: 'LOAD_CART_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({
      type: 'LOAD_CART_FAIL',
      payload: { error: err },
    });
  }
};

export const addToCartAction = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: 'ADD_CART_REQUEST',
      payload: { loadingId: productId, message: 'Adding Item to cart' },
    });
    const res = await axiosInstance.post('cart', {
      productId,
      quantity: 1,
    });
    dispatch({
      type: 'ADD_CART_SUCCESS',
      payload: { ...res.data, loadingId: productId },
    });
  } catch (err) {
    dispatch({
      type: 'ADD_CART_FAIL',
      payload: { error: err, loadingId: productId },
    });
  }
};

export const updateCartItemAction = (cartItem) => async (dispatch) => {
  try {
    dispatch({
      type: 'UPDATE_CART_REQUEST',
      payload: {
        loadingId: cartItem.productId,
        message: 'Updating Item to cart',
      },
    });
    const res = await axiosInstance.put(`cart/${cartItem.id}`, cartItem);
    dispatch({
      type: 'UPDATE_CART_SUCCESS',
      payload: { ...res.data, loadingId: cartItem.productId },
    });
  } catch (err) {
    dispatch({
      type: 'UPDATE_CART_FAIL',
      payload: { error: err, loadingId: cartItem.productId },
    });
  }
};

export const deleteCartItemAction = (cartItem) => async (dispatch) => {
  try {
    dispatch({
      type: 'DELETE_CART_REQUEST',
      payload: {
        loadingId: cartItem.productId,
        message: 'Updating Item to cart',
      },
    });
    await axiosInstance.delete(`cart/${cartItem.id}`);
    dispatch({
      type: 'DELETE_CART_SUCCESS',
      payload: { ...cartItem, loadingId: cartItem.productId },
    });
  } catch (err) {
    dispatch({
      type: 'DELETE_CART_FAIL',
      payload: { error: err, loadingId: cartItem.productId },
    });
  }
};
