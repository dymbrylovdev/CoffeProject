let defaultState = [];

export const foodReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_FOOD":
            return [...state, ...action.payload]
        case "ADD_IS_DISABLED":
            return state.map(item => {
                if(item.id === action.payload.id){
                    return action.payload;
                }else {
                    return item;
                }
            })
        case "DELETE_FOOD_BY_ID":
            for (let id of action.payload){
                state = state.filter(obj => obj.id !== id);
            }
            return state;
        default :
            return state
    }
}