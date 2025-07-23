import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createTask from '../api/CreateTask';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem for dropdown options
import Select from '@mui/material/Select'; // Import Select for dropdown
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel for Select label
import FormControl from '@mui/material/FormControl'; // Import FormControl to wrap Select and InputLabel
import dayjs from 'dayjs'; // Import dayjs for date handling
import { useAuth } from '../context/AuthContext';

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
  display: 'flex', // Use flexbox for better layout of form fields
  flexDirection: 'column', // Arrange items vertically
  gap: '16px', // Add space between form fields
};

export default function AddTaskModal(props) {
  const { allTheTasks } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending'); // Default status to 'pending'
  const [dueDate, setDueDate] = useState(null); // Initialize dueDate as null for DatePicker
  const { auth } = useAuth();

  const handleAdd = async (e) => {
    const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : '';

    const payload = {
      title: title,
      status: status,
      dueDate: formattedDueDate,
    }

    e.preventDefault();

    try {
      await createTask(payload, auth.token);
      handleClose();
      // Optionally clear form fields after successful submission
      setTitle('');
      setStatus('pending');
      setDueDate(null);
      allTheTasks();
    } catch (e) {
      console.error("Error creating task:", e);
      // Handle error, e.g., show an alert to the user
      alert("Failed to create task. Please try again.");
    }
  }

  return (
    <div>
      <AddIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} /> {/* Add cursor pointer for better UX */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-task-modal-title"
        aria-describedby="add-task-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
        >
          {/* Title TextField */}
          <TextField
            id="task-title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            fullWidth
          />

          {/* Status Dropdown (Select) */}
          <FormControl fullWidth>
            <InputLabel id="task-status-label">Status</InputLabel>
            <Select
              labelId="task-status-label"
              id="task-status"
              value={status}
              label="Status"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In-Progress</MenuItem>
              <MenuItem value="testing">Testing</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          {/* Due Date DatePicker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}