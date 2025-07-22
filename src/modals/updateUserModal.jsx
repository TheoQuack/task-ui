import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Added DatePicker import
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Added LocalizationProvider import
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Added AdapterDayjs import
import dayjs from 'dayjs'; // Added dayjs import
import { useAuth } from '../context/AuthContext';
// Assuming you will create an updateUser API call similar to updateTask
import updateUser from '../api/updateUser';

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

export default function UpdateUserModal(props) {
  // Props for user details: selectedID, initialName, initialBirthdate, initialRole
  const { selectedID, initialName, initialBirthdate, initialRole} = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State for user fields
  const [name, setName] = useState(initialName || '');
  const [birthdate, setBirthdate] = useState(initialBirthdate ? dayjs(initialBirthdate) : null); // State for birthdate
  const [role, setRole] = useState(initialRole || 'user'); // Default role

  const { auth } = useAuth();

  useEffect(() => {
    setName(initialName || '');
    setBirthdate(initialBirthdate ? dayjs(initialBirthdate) : null); // Update birthdate state
    setRole(initialRole || 'user');
  }, [selectedID, initialName, initialBirthdate, initialRole]);


  const handleUpdate = async () => {
    const formattedBirthdate = birthdate ? dayjs(birthdate).format('YYYY-MM-DD') : ''; // Format birthdate

    const payload = {
      name: name,
      birthdate: formattedBirthdate, // Changed from email to birthdate
      role: role,
      id: selectedID
    }

    console.log(payload);

    try {
      // Call the updateUser API
      const response = await updateUser(payload, auth.token, selectedID); // Pass payload and auth token

      if (response && response.error) {
        console.error("Update Error:", response.error);
        // Use a custom message box instead of alert()
        // You would typically have a custom modal or snackbar component for this
        console.log(`Update failed: ${response.error}`);
      } else {
        console.log('User updated successfully');
        handleClose();
      }
    } catch (error) {
      console.error('An unexpected error occurred during update:', error);
      // Use a custom message box instead of alert()
      console.log('An error occurred during update. Please try again.');
    }
  }

  return (
    <div>
      <EditIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-user-modal-title"
        aria-describedby="update-user-modal-description"
      >
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#606060',
                        padding: '16px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        Update User
                    </Typography>
                </Box>

                {/* Form Section */}
                <Box
                    sx={style}
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    {/* Name TextField */}
                    <TextField
                        id="update-user-name"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        fullWidth
                    />

                    {/* Birthdate DatePicker */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birthdate"
                            value={birthdate}
                            onChange={(newValue) => {
                                setBirthdate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>

                    {/* Role Dropdown (Select) */}
                    <FormControl fullWidth>
                        <InputLabel id="update-user-role-label">Role</InputLabel>
                        <Select
                            labelId="update-user-role-label"
                            id="update-user-role"
                            value={role}
                            label="Role"
                            onChange={(event) => {
                                setRole(event.target.value);
                            }}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="administrator">Admin</MenuItem>
                        </Select>
                    </FormControl>

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

UpdateUserModal.propTypes = {
  selectedID: PropTypes.string.isRequired,
  // Added initial props for pre-filling the form
  initialName: PropTypes.string,
  initialBirthdate: PropTypes.string, // Changed from initialEmail to initialBirthdate
  initialRole: PropTypes.string,
  refreshUsers: PropTypes.func, // Added a prop to call a function to refresh the user list
};
