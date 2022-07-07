import {useLocation} from "react-router-dom";
import CookComponent from "./CookComponent/CookComponent";
import WaiterComponent from "./WaiterComponent/WaiterComponent";
import AdminComponent from "./AdminComponent/AdminComponent";

const role = {
    cook:'COOK',
    waiter:"WAITER",
    admin:"ADMIN"
}

function HomeComponent(props) {
    let param = props.employee.id_employee_type;
    console.log(param)
    if (param === role.cook){
        return <CookComponent/>
    } else if (param === role.waiter) {
        return <WaiterComponent/>
    } else if (param === role.admin) {
        return <AdminComponent/>
    } else {
        return <div>Ошибка!</div>
    }
}

export default HomeComponent;