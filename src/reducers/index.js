import { combineReducers } from "redux";
import { reducer } from "redux-form";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import requestsReducer from "./requestsReducer";

export default combineReducers({
    form: reducer,
    products : productReducer,
    authState: authReducer,
    cart: cartReducer,
    requests: requestsReducer
})