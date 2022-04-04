export default (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_CART_SUCCESS':
      return payload;

    case 'ADD_CART_SUCCESS':
      return [...state, payload];

    default:
      return state;
  }
};
