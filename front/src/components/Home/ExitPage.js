import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import style from "./HomeComponent.module.css"

export default function ExitPage(){
    let navigate = useNavigate();

    function cleanStorage() {
        localStorage.clear("employee");
        navigate("/")
    }

    return (
        <div className={style.exit_btn}>
            <Button variant="contained" onClick={cleanStorage}  color="error">Выйти</Button>
        </div>
    )
}