
let defaultState = [];


export const typeFoodReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TYPE_FOOD":
            return [...state, ...action.payload]
        default :
            return state
    }
}