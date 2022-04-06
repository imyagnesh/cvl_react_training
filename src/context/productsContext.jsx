import React, { createContext, useReducer, useCallback, useMemo } from 'react';
import { rootInitValue, rootReducer } from '../reducers/rootReducer';
import axiosInstance from '../utils/axiosInstance';

export const ProductsContext = createContext();

// eslint-disable-next-line react/prop-types
export function ProductsProvider({ children }) {
  const [{ loading, products, error }, dispatch] = useReducer(
    rootReducer,
    rootInitValue
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: { message: 'Loading Products' },
      });
      const res = await axiosInstance.get('products');
      dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: { error: err },
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      loadProducts,
      products,
      productLoading: loading,
      productsError: error,
    }),
    [products, loading, error]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
