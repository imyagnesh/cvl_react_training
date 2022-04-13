import { connect } from 'react-redux';
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
  addToCart: (productId) =>
    dispatch({
      type: 'ADD_CART_REQUEST',
      payload: { loadingId: productId, message: 'Adding Item to cart' },
    }),
  updateCartItem: (cartItem) =>
    dispatch({
      type: 'UPDATE_CART_REQUEST',
      payload: {
        cartItem,
        message: 'Updating Item to cart',
      },
    }),
  deleteCartItem: (cartItem) =>
    dispatch({
      type: 'DELETE_CART_REQUEST',
      payload: {
        cartItem,
        message: 'Updating Item to cart',
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
