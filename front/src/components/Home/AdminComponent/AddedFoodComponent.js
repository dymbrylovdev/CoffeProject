import {Button, Grid, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";


export default function AddedFoodComponent() {
    let navigate = useNavigate();
    let typeFood = useSelector(state => state.typeFood)
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

    function addFood() {
        const formValue = {
            "name": document.getElementById("id_name").value,
            "img": document.getElementById("path").value,
            "price": document.getElementById("price").value,
            "id_type_food": type,
        }
        console.log(formValue)
        axios.post("http://localhost:5000/esstu/add_food", formValue)
            .then(function (response) {
                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="reg_container">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        label="Название блюда"
                        id="id_name"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Цена / руб"
                        id="price"
                        type="number"
                        defaultValue={0}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField fullWidth
                        label="URL фото"
                        id="path"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </Grid>

                <Grid item xs={11}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Тип блюда</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="employee_type_select"
                            value={type}
                            label="Должность"
                            onChange={handleChangeAge}
                        >
                            {
                                typeFood.map(item => {
                                    return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                })

                            }
                        </Select>
                    </FormControl>
                </Grid>



                <Grid item xs={11}>
                    <Button variant="contained"
                            fullWidth onClick={addFood}>Добавить блюдо</Button>
                </Grid>
            </Grid>
        </div>
    )
}