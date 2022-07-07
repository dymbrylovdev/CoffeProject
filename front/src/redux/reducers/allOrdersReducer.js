let defaultState = [];

export const allOrdersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_ALL_ORDERS":
            return [...state, ...action.payload]
        case "ADD_ALL_ORDER":
            return [...state, action.payload]
        case "CLEAR_ORDERS":
            return []
        default :
            return state
    }
}