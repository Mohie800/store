import _ from "lodash";

const aproveCount= (state = {}, action) => {
    switch (action.type) {
        case "GET_APR_COUNT" :
            return { ...state, ..._.mapKeys(action.payload, "id")}
        default: return state
    }
}

export default aproveCount;