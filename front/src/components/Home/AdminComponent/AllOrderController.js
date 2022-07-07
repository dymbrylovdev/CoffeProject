import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListFoodComponent from "../ListFoodComponent";
import {useDispatch, useSelector} from "react-redux";

export default function AllOrderController(props) {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //
    // function deleteOrder(item) {
    //     axios.post("http://localhost:5000/esstu/delete_order", item)
    //         .then(value => {
    //             console.log(value)
    //             dispatch({type: "DELETE_ORDER", payload: value.data})
    //         }).catch(e => {
    //         console.log(e)
    //         alert("Что-то пошло не так!")
    //     })
    // }

    return (
        props.orders.map(item => {
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
                            <ListFoodComponent order={JSON.parse(item.food)}/>
                        </AccordionDetails>

                    </Accordion>
                </div>
            )
        })

    );
}
