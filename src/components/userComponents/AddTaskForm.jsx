import { useState } from 'react'
import { TextField, Button } from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createTask from '../../api/CreateTask';



export default function AddTaskForm(){

    const [ title, setTitle ] = useState('');
    const [ date, setDate ] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();
        const payload = {
            title: title,
            dueDate: date.format('YYYY-MM-DD')
        }

        createTask(payload);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <TextField
            label= "Task Title" 
            variant='outlined' 
            fullWidth 
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
            margin='normal'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            label="Set Date"
            onChange={(e) => setDate(e)}
            format='DD-MM-YYYY'
            />
            </LocalizationProvider>
            <Button variant='outlined' type='submit'> Submit</Button>
        </form>
        </>
    );
}