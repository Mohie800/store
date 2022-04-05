const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state.filter((p) => p.id !== action.payload.id),
        action.payload,
      ];
    case "REMOVE_TO_CART":
      //filter through the single item that matches payload and remove it
      return state.filter((cartItem) => cartItem !== action.payload);
    case "CLEAR_CART":
      return (state = []);
    default:
      return state;
  }
};

export default cartReducer;
