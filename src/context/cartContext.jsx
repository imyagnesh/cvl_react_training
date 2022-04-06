import React, { createContext, useReducer, useCallback, useMemo } from 'react';
import { rootInitValue, rootReducer } from '../reducers/rootReducer';
import axiosInstance from '../utils/axiosInstance';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [{ loading, cart, error }, dispatch] = useReducer(
    rootReducer,
    rootInitValue
  );

  const loadCart = useCallback(async () => {
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
  }, []);

  const addToCart = useCallback(async (productId) => {
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
  }, []);

  const updateCartItem = useCallback(async (cartItem) => {
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
  }, []);

  const deleteCartItem = useCallback(async (cartItem) => {
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
  }, []);

  const value = useMemo(
    () => ({
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
      cart,
      cartLoading: loading,
      cartError: error,
    }),
    [cart, loading, error]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
