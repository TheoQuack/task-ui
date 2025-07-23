import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createUser from '../api/createUser';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem'; 
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl'; 
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
  display: 'flex', // Use flexbox for better layout of form fields
  flexDirection: 'column', // Arrange items vertically
  gap: '16px', // Add space between form fields
};

export default function AddUserModal(props) {
  const { allTheUsers } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useAuth();

  const handleAdd = async (e) => {

    const formattedDueDate = birthDate ? dayjs(birthDate).format('YYYY-MM-DD') : '';

    const payload = {
      name: name,
      birthDate: formattedDueDate,
      role: role,
      email: email,
      password: password
    }

    try {
      await createUser(payload, auth.token);
      handleClose();
    
      //reset all the states
      setName('');
      setBirthDate('');
      setRole('');
      setEmail('');
      setPassword('')
      allTheUsers();

    } catch (e) {
      console.error("Error creating User:", e);
      alert("Failed to create User. Please try again.");
    }

    e.preventDefault();
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
          {/* Name TextField */}
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            fullWidth
          />

          {/* Role Dropdown (Select) */}
          <FormControl fullWidth>
            <InputLabel id="task-status-label">Role</InputLabel>
            <Select
              id="user-role"
              value={role}
              label="Role"
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <MenuItem value="administrator">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

              {/* Email TextField */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth
          />

              {/* Password TextField */}
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth
          />

          {/* Birthday DatePicker */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Birthdate"
            value={birthDate}
            onChange={(newValue) => {
                setBirthDate(newValue);
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