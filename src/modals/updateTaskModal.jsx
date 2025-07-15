import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TextField from '@mui/material/TextField';
import EnhancedTable from '../components/TaskList';
import updateTask from '../api/updateTask';
import Button from '@mui/material/Button';

    
export default function UpdateTaskModal(props) {
  const { selectedID } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleUpdate = async () => {

    const payload = {

      title: title,
      status: status,
      dueDate: dueDate,
      id: selectedID

    } 
    await updateTask(payload)
    .then(e=>{
      
      if (e.error){
        console.log(e, "dsigisd");
      }
      else{
        console.log('return');
        <EnhancedTable/>
      }
    }

    );
    handleClose();
}
  return (
  <div>
      <AppRegistrationIcon onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
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
        <Button onClick={()=>{ handleUpdate(); handleClose();}}>Submit</Button>
      </Box>
      </Modal>
    </div>

  );
}

UpdateTaskModal.propTypes = {
  selectedID: PropTypes.func.isRequired
};
