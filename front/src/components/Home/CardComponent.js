import {Card, CardActionArea, CardContent, CardMedia, Checkbox, Typography} from "@mui/material";
import * as React from "react";

function CardComponent(props) {
    function openModalFoodMenu () {
        props.onClick(props.itemFood.id)
    }
    return (
        <Card  sx={{maxWidth: 200}} onClick={openModalFoodMenu}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    height="100"
                    image={props.itemFood.img}
                    alt="Photo"
                />
                <CardContent>
                    <Typography gutterBottom
                                variant="h5"
                                component="div"
                                align="center"
                    >
                        {props.itemFood.name || "not name"}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardComponent;