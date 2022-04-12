import { combineReducers } from "redux";
import { reducer } from "redux-form";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import requestsReducer from "./requestsReducer";
import aproveReducer from "./aproveReducer";
import archiveReducer from "./archiveReducer";
import newCount from "./newCount";
import aproveCount from "./aproveCount";

export default combineReducers({
    form: reducer,
    products : productReducer,
    authState: authReducer,
    cart: cartReducer,
    requests: requestsReducer,
    aproved: aproveReducer,
    archive: archiveReducer,
    new: newCount,
    aproveCount: aproveCount
})