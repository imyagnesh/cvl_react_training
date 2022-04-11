import axiosInstance from '../utils/axiosInstance';

export const loadProductsAction = () => async (dispatch) => {
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
};

export const a = 1;
