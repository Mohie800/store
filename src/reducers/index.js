import { combineReducers } from "redux";
import { reducer } from "redux-form";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import requestsReducer from "./requestsReducer";
import aproveReducer from "./aproveReducer";
import archiveReducer from "./archiveReducer";

export default combineReducers({
    form: reducer,
    products : productReducer,
    authState: authReducer,
    cart: cartReducer,
    requests: requestsReducer,
    aproved: aproveReducer,
    archive: archiveReducer
})