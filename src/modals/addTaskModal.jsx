import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createTask from '../api/CreateTask';
import AuthChecker from '../AuthChecker';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddTaskModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { allTheTasks } = props;

  const handleAdd = async () => {

    const payload = {

      title: title,
      status: status,
      dueDate: dueDate,

    } 
    await createTask(payload)
    .catch((e)=>{
        null
    }
    )
    handleClose();
    allTheTasks();
    
}


    

  return (
<div>
      <AddIcon onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box
        sx={style}
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Title" variant="outlined" 
        value={title}
        onChange={(event) => {
        setTitle(event.target.value);
        }}/>
        <TextField id="filled-basic" label="Status" variant="filled" 
        value={status}
        onChange={(event) => {
        setStatus(event.target.value);
        }}/>    
        <TextField id="standard-basic" label="Due Date" variant="standard" 
        value={dueDate}
        onChange={(event) => {
        setDueDate(event.target.value);
        }}/>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={()=>{ handleAdd();}}>Submit</Button> 
      </Box>
      </Modal>
    </div>

  );
}

AddTaskModal.propTypes = {
  allTheTasks: PropTypes.func.isRequired,
};




