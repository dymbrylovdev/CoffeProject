import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button, Grid, MenuItem, Select} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RegComponent() {
    let navigate = useNavigate();
    const [type, setType] = React.useState('');
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChangeAge = (event) => {
        setType(event.target.value);
    };


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function registration() {
        const formValue = {
            "name": document.getElementById("id_name").value,
            "surname": document.getElementById("id_surname").value,
            "patronymic": document.getElementById("id_patronymic").value,
            "id_employee_type": type,
            "birthday": document.getElementById("date").value,
            "address": document.getElementById("id_address").value,
            "phone": document.getElementById("id_phone").value,
            "snils": document.getElementById("id_snils").value,
            "login": document.getElementById("id_login").value,
            "password": document.getElementById("id_password").value,
        }
        axios.post("http://localhost:5000/esstu/registration", formValue)
            .then(function (response) {
                alert(response.data.message);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="reg_container">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TextField
                        label="Имя"
                        id="id_name"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Фамилия"
                        id="id_surname"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Отчество"
                        id="id_patronymic"

                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Должность</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="employee_type_select"
                            value={type}
                            label="Должность"
                            onChange={handleChangeAge}
                        >
                            <MenuItem value={"COOK"}>Повар</MenuItem>
                            <MenuItem value={"WAITER"}>Офицант</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Логин"
                        id="id_login"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>

                <Grid item xs={8}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="id_password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Телефон"
                        id="id_phone"
                        defaultValue="+7"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Адрес"
                        id="id_address"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Снилс"
                        id="id_snils"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained"
                            fullWidth onClick={registration}>Добавить сотрудника</Button>
                </Grid>
            </Grid>
        </div>
    );
}


export default RegComponent;