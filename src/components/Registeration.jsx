import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';


export default function Registration() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
                        throw new Error("Registration Error");
                    }
                    navigate('/login');
                })
                .catch(error => {
                    console.log(error);
                    window.alert('An error occurred during registration.'); // Added user-friendly alert
                });


        } catch (err) {
            console.log(err);
            window.alert('An unexpected error occurred.'); // Added user-friendly alert for general errors
        }

    }


    return (
        <Container maxWidth="sm"> {/* Consistent Container for max-width and centering */}
            <Box
                sx={{
                    mt: 8, // Margin top for vertical spacing
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // Styles to make the box fixed white and stand out
                    bgcolor: 'white', // Explicitly set to white
                    border: '1px solid #e0e0e0', // Subtle border
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Stronger shadow
                    overflow: 'hidden',
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#606060', // Dark grey header
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
                        id="name-input" // Changed ID for clarity
                        label="Enter Your Name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="email-input" // Changed ID for clarity
                        label="Enter Your Email"
                        placeholder='Email'
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="password-input" // Changed ID for clarity
                        label="Enter Your Password"
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="confirm-password-input" // Changed ID for clarity
                        label="Confirm Your Password"
                        placeholder='Confirm Password'
                        type="password" // Important for hiding characters
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2,
                            py: 1.5,
                            background: 'linear-gradient(to right, #2196F3, #64B5F6)', // Blue gradient
                            '&:hover': {
                                background: 'linear-gradient(to right, #1976D2, #42A5F5)', // Darker blue on hover
                            },
                        }}
                    >
                        Register
                    </Button>
                    <Link
                        component={RouterLink} to="/login"
                        variant="body2"
                        sx={{ alignSelf: 'flex', mt: 1 }} // Align to end, margin top
                    >
                        Login!
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}