import _ from "lodash";

const archiveReducer= (state = {}, action) => {
    switch (action.type) {
        case "GET_ARCHIVES" :
            return { ...state, ..._.mapKeys(action.payload, "id")}
        case "GET_ARCHIVE" :
            return {...state, [action.payload.id] : action.payload}
        case "DELETE_ARCHIVE" :
            return _.omit(state, action.payload)
        default: return state
    }
}

export default archiveReducer;