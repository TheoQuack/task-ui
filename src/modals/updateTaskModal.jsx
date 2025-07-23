import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit'; 
import TextField from '@mui/material/TextField';
import updateTask from '../api/updateTask';
import Button from '@mui/material/Button';
import { Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs'; 
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
  display: 'flex', 
  flexDirection: 'column', 
  gap: '16px',
};

export default function UpdateTaskModal(props) {
  const { selectedID, initialTitle, initialStatus, initialDueDate, allTheTasks} = props; 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(initialTitle || ''); 
  const [status, setStatus] = useState(initialStatus || 'pending'); 
  const [dueDate, setDueDate] = useState(initialDueDate ? dayjs(initialDueDate) : null); 
  const { auth } = useAuth();

  useEffect(() => {
    setTitle(initialTitle || '');
    setStatus(initialStatus || 'pending');
    setDueDate(initialDueDate ? dayjs(initialDueDate) : null);
  }, [selectedID, initialTitle, initialStatus, initialDueDate]);


  const handleUpdate = async () => {
    const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : '';

    const payload = {
      title: title,
      status: status,
      dueDate: formattedDueDate,
      id: selectedID
    }

    try {
      const response = await updateTask(payload, auth.token);

      if (response && response.error) { // Assuming updateTask returns a response object
        console.error("Update Error:", response.error);
        window.alert(`Update failed: ${response.error}`);
      } else {
        console.log('Task updated successfully');
        handleClose();
        allTheTasks();
      }
    } catch (error) {
      console.error('An unexpected error occurred during update:', error);
      window.alert('An error occurred during update. Please try again.');
    }
  }

  return (
    <div>
      <EditIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-task-modal-title"
        aria-describedby="update-task-modal-description"
      >
        <Container maxWidth="sm"> {/* Added Container for centering and max-width */}
            <Box
                sx={{
                    mt: 8, // Margin top for vertical spacing
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #ccc', // Border around the form container
                    borderRadius: '8px', // Rounded corners
                    overflow: 'hidden', // Ensures header background color extends to corners
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#606060', // Dark grey from the image
                        padding: '16px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Update Task
                    </Typography>
                </Box>

                {/* Form Section */}
                <Box
                    sx={style}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    {/* Title TextField */}
                    <TextField
                        id="update-task-title"
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
                        <InputLabel id="update-task-status-label">Status</InputLabel>
                        <Select
                            labelId="update-task-status-label"
                            id="update-task-status"
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
                        <Button variant="contained" onClick={handleUpdate}>Submit</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
      </Modal>
    </div>
  );
}

UpdateTaskModal.propTypes = {
  selectedID: PropTypes.string.isRequired,
  // Added initial props for pre-filling the form
  initialTitle: PropTypes.string,
  initialStatus: PropTypes.string,
  initialDueDate: PropTypes.string, // Assuming date comes as a string like 'YYYY-MM-DD'
  refreshTasks: PropTypes.func, // Added a prop to call a function to refresh the task list
  allTheTasks: PropTypes.func
};