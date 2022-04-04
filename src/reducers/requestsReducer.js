import _ from "lodash";

const requestsReducer= (state = {}, action) => {
    switch (action.type) {
        case "GET_REQUESTS" :
            return { ...state, ..._.mapKeys(action.payload, "id")}
        case "GET_REQUEST" :
            return {...state, [action.payload.id] : action.payload}
        case "DELETE_REQUEST" :
            return _.omit(state, action.payload)
        default: return state
    }
}

export default requestsReducer;