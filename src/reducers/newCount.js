
const newCount= (state = [], action) => {
    switch (action.type) {
        case "GET_NEW" :
            return [ ...state, action.payload ]
        default: return state
    }
}

export default newCount;