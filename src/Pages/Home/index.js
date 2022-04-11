import { connect } from 'react-redux';
import { loadProductsAction } from '../../actions/productsActions';
import { loadCartAction } from '../../actions/cartActions';
import Home from './Home';

const mapStateToProps = (state) => ({
  products: state.products,
  isProductsLoading: state.loading.find(
    (x) => x.actionName === 'LOAD_PRODUCTS'
  ),
  hasProductsError: state.errors.find((x) => x.actionName === 'LOAD_PRODUCTS'),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => loadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
