import React from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import {VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import HomeComponent from "./Home/HomeComponent";
import {Button, Container, FilledInput, InputLabel, Stack, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

function LoginPage(isLogin) {
    let navigate = useNavigate();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    if (isLogin){
        return <HomeComponent employee={isLogin}/>
    }

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

    function login() {
        localStorage.getItem("employee")
        let login = document.getElementById("standard-basic").value;
        axios.post("http://localhost:5000/esstu/login", {
            "login": login,
            "password": values.password,
        }).then(res => {
            alert(res.data.message);
            if (res.data.employee){
                localStorage.setItem("employee", JSON.stringify(res.data.employee));
                navigate("/");
            }
        })
    }

    return (
        <Container maxWidth="sm" className="auth_container">

            <Stack spacing={3}>
                <TextField id="standard-basic" label="login" variant="standard"/>
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    id="filled-adornment-password"
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
                />
                <Button variant="contained" onClick={login}>Войти</Button>
            </Stack>
        </Container>
    )
}

export default LoginPage;