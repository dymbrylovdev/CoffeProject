import style from "./AdminComponent.module.css";
import {Grid} from "@mui/material";
import ExitPage from "../ExitPage";
import * as React from "react";
import FullWidthTabs from "./TabPanel";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";


function AdminComponent() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:5000/esstu/get_list_employee')
            .then(value => {
                dispatch({type: "ADD_EMPLOYEE", payload: value.data})
            })
        axios.get('http://localhost:5000/esstu/get_all_list_orders')
            .then(value => {
                dispatch({type: "ADD_ALL_ORDERS", payload: value.data})
            })
    }, [])

    return (
        <div className={style.wrap}>
            <Grid item xs={12}>
                <ExitPage/>
            </Grid>
            <FullWidthTabs/>
        </div>
    )
}

export default AdminComponent;