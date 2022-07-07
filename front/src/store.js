
import {combineReducers} from "redux";
import {typeFoodReducer} from "./redux/reducers/typeFoodReducer";
import {listOrderReducer} from "./redux/reducers/listOrderReducer";
import {foodReducer} from "./redux/reducers/foodReducer";
import {ordersReducer} from "./redux/reducers/ordersReducer";
import {employeeReducer} from "./redux/reducers/employeeReducer";
import {allOrdersReducer} from "./redux/reducers/allOrdersReducer";

export const mainReducer = combineReducers({
    food: foodReducer,
    typeFood: typeFoodReducer,
    orderFood: listOrderReducer,
    orderList: ordersReducer,
    employee: employeeReducer,
    allOrdersList: allOrdersReducer,
})


