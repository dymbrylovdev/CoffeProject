import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';

import {useDispatch, useSelector} from "react-redux";
import ControlledAccordions from "./AllOrderController";
import axios from "axios";
import {Button, Grid} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import RegComponent from "./RegComponent";
import AddedFoodComponent from "./AddedFoodComponent";
import {useState} from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const dispatch = useDispatch();
    const dataEmployee = useSelector(state => state.employee);
    const dataFood = useSelector(state => state.food);
    const orders = useSelector(store => store.allOrdersList)
    const [SelectionItemEmployee, setSelectionItemEmployee] = useState();
    const [SelectionItemFood, setSelectionItemFood] = useState();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const deleteEmployeeItem = () => {
        console.log(SelectionItemEmployee);
        axios.post("http://localhost:5000/esstu/delete_employee", SelectionItemEmployee)
            .then(value => {
                dispatch({type: "DELETE_EMPLOYEE_BY_ID", payload: SelectionItemEmployee})

            })
            .catch()
    };
    const deleteFoodItem = () => {
        axios.post('http://localhost:5000/esstu/delete_food',SelectionItemFood)
            .then(value => {
                dispatch({type: "DELETE_FOOD_BY_ID", payload: SelectionItemFood})
                alert(value.data.message)
            })
            .catch()
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const delAllListOrders = () => {
        axios.delete('http://localhost:5000/esstu/del_all_list_orders')
            .then(value => {
                console.log(value)
                dispatch({type: "CLEAR_ORDERS", payload: value.data})
            })
    };

    return (
        <Box sx={{bgcolor: 'background.paper', width: '100%'}}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Список сотрудников" {...a11yProps(0)} />
                    <Tab label="Список блюд" {...a11yProps(1)} />
                    <Tab label="Заказы за сегодня" {...a11yProps(2)} />
                    <Tab label="Склад продуктов" {...a11yProps(3)}/>
                    <Tab label="Добавление сотрудников" {...a11yProps(4)} />
                    <Tab label="Добавление блюд" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <div style={{height: 500, width: '100%'}}>
                        <DataGrid
                            rows={dataEmployee}
                            columns={columnsEmployee}
                            checkboxSelection
                            onSelectionModelChange={(id) => {
                                setSelectionItemEmployee(id);
                            }}
                        />
                    </div>
                    <Button variant="outlined" onClick={deleteEmployeeItem} startIcon={<DeleteIcon/>}>
                        Удалить
                    </Button>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <div style={{height: 500, width: '100%'}}>
                        <DataGrid
                            rows={dataFood}
                            columns={columnsFood}
                            pageSize={25}
                            checkboxSelection
                            onSelectionModelChange={(id) => {
                                setSelectionItemFood(id);
                            }}
                        />
                    </div>
                    <Button variant="outlined" onClick={ deleteFoodItem} startIcon={<DeleteIcon/>}>
                        Удалить
                    </Button>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <div style={{height: 500, width: '100%'}}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <ControlledAccordions orders={orders}/>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    orders.length <= 0
                                        ?
                                        null
                                        :
                                        <Button variant="outlined" onClick={delAllListOrders} startIcon={<DeleteIcon/>}>
                                            Очистить все
                                        </Button>
                                }

                            </Grid>
                        </Grid>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>

                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <RegComponent/>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <AddedFoodComponent/>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}

const columnsEmployee = [
    {field: 'name', headerName: 'Имя', width: 180},
    {field: 'surname', headerName: 'Фамилия', width: 180,},
    {field: 'patronymic', headerName: 'Отчество', width: 180,},
    {field: 'employee_type', headerName: 'Должность'},
    {
        field: 'birthday',
        headerName: 'birthday',
        type: 'date',
        width: 180,
    },
    {
        field: 'address',
        headerName: 'address',
        width: 220,
    },
    {
        field: 'phone',
        headerName: 'phone',
        width: 220,
    },
    {
        field: 'snils',
        headerName: 'snils',
        width: 220,
    },
    {
        field: 'login',
        headerName: 'login',
        width: 220,
    },
];

const columnsFood = [
    {field: 'name', headerName: 'Имя', width: 180},
    {field: 'price', headerName: 'Цена', width: 180,},
    {field: 'type_food', headerName: 'Тип блюда'},
];