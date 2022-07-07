let defaultState = [];

export const ordersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_ORDERS":
            return [...state, ...action.payload]
        case "ADD_ORDER":
            return [...state, action.payload]
        case "DELETE_ORDER":
            return [...state.filter(item => item.id !== action.payload.id)]
        default :
            return state
    }
}