import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


export default function Registration() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            window.alert('Error: Passwords do not match');
            return; // Prevent form submission if passwords don't match
        }

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": name,
                "birthDate": "2004-10-24", // Assuming this is a static value for now
                "role": "user", // Assuming this is a static value for now
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/register", requestOptions)
                .then(response => response.text())
                .then((e) => {
                    let parsedData = JSON.parse(e);
                    if (parsedData.error) {
                        throw new Error(parsedData.error || "Registration Error"); // Use parsedData.error if available
                    }
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Registration Error:', error); // Use console.error for errors
                    window.alert(`Registration failed: ${error.message || 'Unknown error'}`);
                });

        } catch (err) {
            console.error('Catch block error:', err); // Use console.error for errors
        }
    }

    return (
        <Container maxWidth="sm"> {/* Use Container for centering and max-width */}
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
                        TaskManager Registration
                    </Typography>
                </Box>
                    
                {/* Form Section */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        p: 4, // Padding inside the form box
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // Spacing between TextFields
                    }}
                >
                    <TextField
                        id="name-input" // Changed id for uniqueness and clarity
                        label="Name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        fullWidth // Makes TextField take full width
                    />
                    <TextField
                        id="email-input" // Changed id
                        label="Email"
                        placeholder='Email'
                        type="email" // Semantic type for email input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="password-input" // Changed id
                        label="Password"
                        placeholder='Password'
                        type="password" // Hides input characters
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="confirm-password-input" // Changed id
                        label="Confirm Password"
                        placeholder='Confirm Password'
                        type="password" // Hides input characters
                        value={confirmPassword} // Bind to new state
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        fullWidth
                    />
                    
                    <Button
                        type="submit"
                        variant="contained" // Material-UI filled button
                        sx={{
                            mt: 2, // Margin top for spacing from last TextField
                            py: 1.5, // Vertical padding to make the button taller
                            // Gradient background matching the image
                            background: 'linear-gradient(to right, #2196F3, #64B5F6)', // Blue gradient
                            '&:hover': {
                                background: 'linear-gradient(to right, #1976D2, #42A5F5)', // Slightly darker blue on hover
                            },
                        }}
                    >
                        Register
                    </Button>
                   <Link
                        href="#" // You can replace this with a proper route to a "Forgot Password" page
                        variant="body2"
                        sx={{ alignSelf: 'flex', mt: 1 }}
                        component={RouterLink} to="/login"
                    >
                        Login!
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}