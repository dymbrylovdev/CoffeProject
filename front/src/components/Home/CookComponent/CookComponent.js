import * as React from "react";
import style from "./CookComponent.module.css";
import {Card, CardActionArea, CardContent, CardMedia, Checkbox, Grid, Typography} from "@mui/material";
import ExitPage from "../ExitPage";
import CardComponent from "../CardComponent";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import RowGroupingBasicExample from "./ControlledAccordions";
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

function CookComponent() {
    const listFood = useSelector(store => store.typeFood);
    const dispatch = useDispatch();
    const food = useSelector(store => store.food);
    const [open, setOpen] = React.useState({visible: false, id: null});

    const handleOpen = (id) => setOpen({...open, visible: true, id: id});
    const handleClose = () => setOpen({visible: false, id: null});


    useEffect(() => {

        subscribe()
    },[])
    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/esstu/get_orders')
        eventSource.onmessage = await function (event) {
            let data =  JSON.parse(event.data);
            dispatch({type: "ADD_ORDER", payload: data})
        }
    }

    const isDisable = (event,idFood) => {
        let food = {
            id : idFood,
            is_ready: event.target.checked
        }
        axios.post('http://localhost:5000/esstu/is_ready', food)
    }
    function foodList() {
        let list = food.filter(item => item.id_type_food === open.id);
        return list.map((itemFood) => {
                return (
                    <Grid key={itemFood.id} item xs={3}>
                        <Card >
                            <CardActionArea >
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
                                    <Checkbox onClick={(event) => isDisable(event,itemFood.id)} defaultChecked={itemFood.is_ready} color="secondary" />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            }
        )
    }
    return (
            <div className={style.wrap}>
                <div className={style.right}>
                    <RowGroupingBasicExample />
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
                                    <Grid container spacing={5} >
                                        {open.visible ? foodList() : null}
                                    </Grid>
                                </div>
                            </Box>
                        </Modal>
                </div>
            </div>
    )
}

export default CookComponent;