import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";

const columns = [
    { id: 'name', label: 'Название', minWidth: '20%' },
    {
        id: 'amount',
        label: 'Количество',
        align: 'right',
        minWidth: '20%' },
    {
        id: 'price',
        label: 'Цена',
        minWidth: '20%',
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'sumPrice',
        label: 'Итого',
        minWidth: '20%',
        align: 'right',
        format: (value) => value.toFixed(2),
    },

];


export default function ListFoodComponent(props) {
    const dispatch = useDispatch();
    function deleteOrderItem(item) {
        dispatch({type:"DELETE_ORDER",payload: {...item}})
        props.deleteOrder(item.price)
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ height: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.order
                            .map((row) => {
                                return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value
                                                        }

                                                    </TableCell>
                                                );
                                            })}
                                            {props.type === "WAITER"?
                                                <TableCell>
                                                    <IconButton key={row.id} edge="end" aria-label="delete" onClick={()=>deleteOrderItem(row)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                                :null
                                            }

                                        </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}
