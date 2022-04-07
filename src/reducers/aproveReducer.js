import _ from "lodash";

const aproveReducer= (state = {}, action) => {
    switch (action.type) {
        case "GET_APROVEDS" :
            return { ...state, ..._.mapKeys(action.payload, "id")}
        case "GET_APROVED" :
            return {...state, [action.payload.id] : action.payload}
        case "DELETE_APROVED" :
            return _.omit(state, action.payload)
        default: return state
    }
}

export default aproveReducer;