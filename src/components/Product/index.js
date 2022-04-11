import { connect } from 'react-redux';
import {
  addToCartAction,
  deleteCartItemAction,
  updateCartItemAction,
} from '../../actions/cartActions';
import Product from './Product';

const mapStateToProps = (state, props) => ({
  cartItem: state.cart.find((x) => x.productId === props.id),
  isAdding: state.loading.find(
    (x) => x.loadingId === props.id && x.actionName === 'ADD_CART'
  ),
  isUpdating: state.loading.find(
    (x) => x.loadingId === props.id && x.actionName === 'UPDATE_CART'
  ),
  isDeleting: state.loading.find(
    (x) => x.loadingId === props.id && x.actionName === 'DELETE_CART'
  ),
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (productId) => addToCartAction(productId)(dispatch),
  updateCartItem: (cartItem) => updateCartItemAction(cartItem)(dispatch),
  deleteCartItem: (cartItem) => deleteCartItemAction(cartItem)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
