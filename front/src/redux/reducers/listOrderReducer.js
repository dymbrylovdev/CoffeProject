
const defaultState = [

]

export const listOrderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_ORDER":
            let item = state.find(item=> action.payload.id === item.id);
            if (item){
                return state.map(itemStore => {
                    if(itemStore.id === item.id){
                        itemStore.amount+= 1;
                        itemStore.sumPrice +=item.price;
                        return itemStore;
                    }
                    return itemStore;
                })
            }
            return [...state, action.payload];
        case "DELETE_ORDER":
            let delItem =  action.payload;
            if(delItem.amount > 1){
                return state.map(itemStore => {
                    if(itemStore.id === delItem.id){
                        itemStore.amount-= 1;
                        itemStore.sumPrice-=delItem.price;
                        return itemStore;
                    }
                    return itemStore;
                })
            }
            return state.filter(obj => obj.id !== delItem.id);
        case "CLEAR_ORDER":
            return [];
        default :
            return state;
    }
}