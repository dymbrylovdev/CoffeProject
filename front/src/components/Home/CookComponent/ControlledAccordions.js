import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListFoodComponent from "../ListFoodComponent";
import {useDispatch, useSelector} from "react-redux";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {Button} from "@mui/material";
import style from "./CookComponent.module.css";
import axios from "axios";

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);
    const orders = useSelector(store => store.orderList)
    const dispatch = useDispatch();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function deleteOrder(item) {
        axios.post("http://localhost:5000/esstu/delete_order", item)
            .then(value => {
                console.log(value)
                dispatch({type: "DELETE_ORDER", payload: value.data})
            }).catch(e => {
            console.log(e)
            alert("Что-то пошло не так!")
        })
    }

    return (
        orders.map(item => {
            return (
                <div key={item.id}>
                    <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                Заказ:
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>№ {item.number}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={style.btn_is_ready}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => deleteOrder(item)}
                                >
                                    <CheckCircleOutlineOutlinedIcon/>
                                </Button>
                            </div>

                            <ListFoodComponent order={JSON.parse(item.food)}/>
                        </AccordionDetails>

                    </Accordion>
                </div>
            )
        })

    );
}
