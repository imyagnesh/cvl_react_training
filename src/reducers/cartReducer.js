export default (state = [], { type, payload }) => {
  switch (type) {
    case 'LOAD_CART_SUCCESS':
      return payload;

    case 'ADD_CART_SUCCESS':
      return [...state, payload];

    case 'UPDATE_CART_SUCCESS':
      return state.map((x) => (x.id === payload.id ? payload : x));

    case 'DELETE_CART_SUCCESS':
      return state.filter((x) => x.id !== payload.id);

    default:
      return state;
  }
};
