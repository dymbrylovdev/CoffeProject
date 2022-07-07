import style from "./WaiterComponent.module.css"
import {
    Button,
    Card, CardActionArea, CardContent, CardMedia,
    Grid, TextField, Typography,
} from "@mui/material";
import * as React from "react";
import CardComponent from "../CardComponent";
import ListFoodComponent from "../ListFoodComponent";
import ExitPage from "../ExitPage";
import {useDispatch, useSelector} from "react-redux";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectAutoWidth from "./SelectAutoWidth";
import axios from "axios";
import {useEffect} from "react";


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function WaiterComponent() {
    const dispatch = useDispatch();
    const listFood = useSelector(store => store.typeFood);
    const food = useSelector(store => store.food);
    const order = useSelector(store => store.orderFood)
    const [open, setOpen] = React.useState({visible: false, id: null});
    const [pay, setPay] = React.useState(0);
    const [sumPrice, setSumPrice] = React.useState(0);
    const [number, setNumber] = React.useState('');
    const handleOpen = (id) => setOpen({...open, visible: true, id: id});
    const handleClose = () => setOpen({visible: false, id: null});


    function clearForm() {
        setPay(0);
        setSumPrice(0);
        setNumber("");
        document.getElementById("filled-number").value = 0;
        dispatch({type: "CLEAR_ORDER", payload: []})
    }

    const handleChangeNumber = (event) => {
        setNumber(event.target.value);
    };

    function addOrderItem(item) {
        dispatch({type: "ADD_ORDER", payload: {...item, amount: 1, sumPrice: item.price}})
        setSumPrice(value => value + item.price)
        let sum = item.price - ((item.price / 100) * document.getElementById("filled-number").value);
        setPay(value => (+value + +sum).toFixed(2));
    }

    function deleteOrder(price) {
        setSumPrice(value => value - price)
        let sum = price - ((price / 100) * document.getElementById("filled-number").value);
        setPay(value => (+value - +sum).toFixed(2));
    }

    function sendOrder() {
        if (number==="") {
            return alert("Выбирите столик");
        }
        const nextOrder = {
            number: number,
            food: order
        }
        if (order.length === 0) {
            alert("Пусто");
            return
        } else {
            axios.post('http://localhost:5000/esstu/set_orders', nextOrder)
            alert("Заказ отправлен");
            clearForm();
        }
    }

    useEffect(() => {
        subscribe();
    }, [])


    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/esstu/is_disabled')
        eventSource.onmessage = await function (event) {
            let data = JSON.parse(event.data);
            dispatch({type: "ADD_IS_DISABLED", payload: data})
        }
    }

    function setBonuseInPrice(value) {
        setPay(sumPrice - (sumPrice / 100 * value.target.value))
    }

    function foodList() {
        let list = food.filter(item => item.id_type_food === open.id);
        return list.map((itemFood) => {
                return (
                    <Grid key={itemFood.id} item xs={3}>
                        <div className={itemFood.is_ready ? null : style.disable}>
                            <Card>
                                <CardActionArea onClick={() => addOrderItem(itemFood)}>
                                    <CardMedia
                                        component="img"
                                        height="100"
                                        image={itemFood.img}
                                        alt="Photo"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom
                                                    variant="h5"
                                                    component="div"
                                                    align="center"
                                        >
                                            {itemFood.name || "not name"}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    </Grid>
                );
            }
        )
    }


    return (
        <div className={style.wrap}>
            <div className={style.right}>
                <ListFoodComponent order={order} deleteOrder={deleteOrder} type={"WAITER"}/>
                <Button variant="contained" color="success" onClick={sendOrder} fullWidth>
                    Отправить заказ
                </Button>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>Итого</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>{sumPrice} руб</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>К оплате:</div>
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>Бонусы</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>
                            <TextField
                                id="filled-number"
                                label="Бонусы"
                                type="number"
                                defaultValue={0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={value => setBonuseInPrice(value)}
                                variant="filled"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={style.label_panel}>{pay} руб</div>
                    </Grid>
                </Grid>

                <Grid container spacing={5}>
                    <Grid item xs={3}>
                        <SelectAutoWidth number={number} onChange={handleChangeNumber}/>
                    </Grid>
                </Grid>
            </div>
            <div className={style.left}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <ExitPage/>
                    </Grid>
                    {
                        listFood.map(itemFood => (
                            <Grid key={itemFood.id} item xs={3}>
                                <CardComponent itemFood={itemFood} onClick={handleOpen}/>
                            </Grid>
                        ))
                    }
                </Grid>

                <Modal
                    keepMounted
                    open={open.visible}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={styleModal}>
                        <div className={style.modal}>
                            <Grid container spacing={5}>
                                {open.visible ? foodList() : null}
                            </Grid>
                        </div>
                    </Box>
                </Modal>

            </div>
        </div>
    )
}


