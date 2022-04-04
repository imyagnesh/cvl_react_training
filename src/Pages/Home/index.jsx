import React, { useEffect, useReducer, useMemo, useCallback } from 'react';

import axiosInstance from '../../utils/axiosInstance';
import Product from '../../components/Product';
import { rootInitValue, rootReducer } from '../../reducers/rootReducer';

function Home() {
  const [{ loading, products, error, cart }, dispatch] = useReducer(
    rootReducer,
    rootInitValue
  );

  const productLoading = useMemo(
    () => loading.find((x) => x.actionName === 'LOAD_PRODUCTS'),
    [loading]
  );

  const productsError = useMemo(
    () => error.find((x) => x.actionName === 'LOAD_PRODUCTS'),
    [error]
  );

  const loadProducts = async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: { message: 'Loading Products' },
      });
      const res = await axiosInstance.get('products');
      dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOAD_PRODUCTS_FAIL', payload: err });
    }
  };

  const loadCart = async () => {
    try {
      dispatch({
        type: 'LOAD_CART_REQUEST',
        payload: { message: 'Loading Products' },
      });
      const res = await axiosInstance.get('cart');
      dispatch({ type: 'LOAD_CART_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOAD_CART_FAIL', payload: err });
    }
  };

  const addToCart = useCallback(async (productId) => {
    try {
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: { message: 'Adding Item to cart' },
      });
      const res = await axiosInstance.post('cart', {
        productId,
        quantity: 1,
      });
      dispatch({
        type: 'ADD_CART_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'ADD_CART_FAIL',
        payload: err,
      });
    }
  }, []);

  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, []);

  if (productLoading) {
    return <h1>{productLoading.message}</h1>;
  }

  if (productsError) {
    return <h1>{productsError.error.message}</h1>;
  }

  return (
    <div>
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        return (
          <Product
            key={product.id}
            data={product}
            addToCart={addToCart}
            cartItem={cartItem}
          />
        );
      })}
    </div>
  );
}

export default Home;
