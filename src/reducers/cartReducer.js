import _ from "lodash";


const cartReducer = (state=[], action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state.filter(p => p.id !== action.payload.id), action.payload];
            case "REMOVE_TO_CART":
      //filter through the single item that matches payload and remove it
        return state.filter(cartItem => cartItem !== action.payload);
        default: return state;
    }
}

export default cartReducer;