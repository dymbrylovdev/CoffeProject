import './App.css';
import React, {useEffect} from 'react';
import LoginPage from "./components/LoginComponent";
import {Route, Routes} from "react-router-dom";
import RegComponent from "./components/Home/AdminComponent/RegComponent";
import axios from "axios";
import {useDispatch} from "react-redux";

//

function App() {
    const dispatch = useDispatch();
    const isLogin = JSON.parse(localStorage.getItem("employee"));
    const loginPage = LoginPage(isLogin);

    useEffect(() => {
        axios.get('http://localhost:5000/esstu/list_type_food')
            .then(value => {
                dispatch({type: "ADD_TYPE_FOOD", payload: value.data.typeFood})
            })
        axios.get('http://localhost:5000/esstu/list_food')
            .then(value => {
                dispatch({type: "ADD_FOOD", payload: value.data.food})
            })
        axios.get('http://localhost:5000/esstu/get_list_orders')
            .then(value => {
                dispatch({type: "ADD_ORDERS", payload: value.data})
            })
    }, []);


    return (
        <div className="App">
            <Routes>
                <Route path="/" element={loginPage}/>
                <Route path="/reg" element={<RegComponent/>}/>
            </Routes>
        </div>
    );
}

export default App;
