import _ from "lodash";

const productReducer= (state = {}, action) => {
    switch (action.type) {
        case "UPLOAD_PRODUCT" :
            return {...state, [action.payload.id] : action.payload}
        case "GET_PRODUCTS" :
            return { ...state, ..._.mapKeys(action.payload, "id")}
        case "GET_PRODUCT" :
            return {...state, [action.payload.id] : action.payload}
        case "EDIT_PRODUCT" :
            return {...state, [action.payload.id] : action.payload}
        case "DELETE_PRODUCT" :
            return _.omit(state, action.payload)
        default: return state
    }
}

export default productReducer;