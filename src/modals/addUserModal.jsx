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
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

export default function AddUserModal(props) {
  const { allTheUsers } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage(''); // Clear error message when closing the modal
    // Also reset form fields when modal is closed
    setName('');
    setBirthDate(null);
    setRole('');
    setEmail('');
    setPassword('');
  };

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { auth } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages before new submission

    const formattedBirthDate = birthDate ? dayjs(birthDate).format('YYYY-MM-DD') : '';

    const payload = {
      name: name,
      birthDate: formattedBirthDate,
      role: role,
      email: email,
      password: password
    }

    try {
      await createUser(payload, auth.token);
      handleClose(); // Close only on successful creation
      allTheUsers(); // Refresh user list
    } catch (error) {
      if (error.response && error.response.data) {
        const backendError = error.response.data;
        if (backendError.errors && Array.isArray(backendError.errors)) {
          // If there's an 'errors' array (e.g., from Sequelize validation)
          setErrorMessage(backendError.errors.join(', '));
        } else if (backendError.message) {
          // If there's a general 'message' property
          setErrorMessage(backendError.message);
        } else {
          // Fallback if the structure is unexpected
          setErrorMessage("An unknown error occurred from the server.");
        }
      } else if (error.message) {
        // If it's a network error or something before the backend response
        setErrorMessage(`Network or client error: ${error.message}`);
      } else {
        setErrorMessage("Failed to create user. Please try again.");
      }
    }
  }

  return (
    <div>
      <AddIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
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
            <InputLabel id="user-role-label">Role</InputLabel>
            <Select
              labelId="user-role-label"
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
            type="password"
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

          {/* Display Error Message */}
          {errorMessage && (
            <Box sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
              {errorMessage.split(',').map((message, index) => (
                <p key={index} style={{ margin: '4px 0' }}>{message.trim()}</p>
              ))}
            </Box>
          )}

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