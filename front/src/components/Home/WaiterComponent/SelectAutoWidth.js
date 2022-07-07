import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const number = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

export default function SelectAutoWidth(props) {


    return (
            <FormControl variant="filled" sx={{  minWidth: 200 }}>
                <InputLabel id="demo-simple-select-filled-label">Номер столика</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={props.number}
                    onChange={props.onChange}
                >
                    {number.map(item => {
                        return <MenuItem key={item} value={item}>№ {item}</MenuItem>
                    })}

                </Select>
            </FormControl>
    );
}
