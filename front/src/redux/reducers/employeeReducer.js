let defaultState = [];

export const employeeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_EMPLOYEE":
            return [...state, ...action.payload]
        case "CREATE_EMPLOYEE":
            return [...state, ...action.payload]
        case "DELETE_EMPLOYEE":
            return state.filter(obj => obj.id !== action.payload.id);
        case "DELETE_EMPLOYEE_BY_ID":
            for (let id of action.payload){
                state = state.filter(obj => obj.id !== id);
            }
            return state;
        case "UPDATE_EMPLOYEE":
            // return state.map(item => {
            //     if(item.id === action.payload.id){
            //         return action.payload;
            //     }else {
            //         return item;
            //     }
            // })
        default :
            return state
    }
}