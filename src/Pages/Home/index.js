import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => ({
  products: state.products,
  isProductsLoading: state.loading.find(
    (x) => x.actionName === 'LOAD_PRODUCTS'
  ),
  hasProductsError: state.errors.find((x) => x.actionName === 'LOAD_PRODUCTS'),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () =>
    dispatch({
      type: 'LOAD_PRODUCTS_REQUEST',
      payload: { message: 'Loading Products' },
    }),
  loadCart: () =>
    dispatch({
      type: 'LOAD_CART_REQUEST',
      payload: { message: 'Loading Products' },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
