import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": email,
                "password": password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/login", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    localStorage.setItem("TOKEN", encodeURI(result.token));
                    if (result.error) {
                        console.log(result.error);
                        window.alert('Error: Invalid Credentials');
                    } else {
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    window.alert('An error occurred during login.');
                });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // This ensures the background is always white
                    bgcolor: 'white', // Explicitly set to white

                    // Adding a stronger border and a larger shadow to make it stand out more
                    border: '1px solid #e0e0e0', // Lighter border for subtle definition
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Stronger shadow
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: '#606060', // Dark grey for the header
                        padding: '16px',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h5" sx={{ color: 'white' }}>
                        TaskManager Login
                    </Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // Spacing between TextFields
                    }}
                >
                    <TextField
                        id="email-input"
                        label="Email"
                        placeholder='Email'
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="password-input"
                        label="Password"
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        fullWidth
                    />
                    <Link
                        component={RouterLink} to="/registration"
                        variant="body2"
                        sx={{ alignSelf: 'flex', mt: 1 }}
                    >
                        Register Now!
                    </Link>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 2, // Margin top
                            py: 1.5, // Padding vertical
                            background: 'linear-gradient(to right, #2196F3, #64B5F6)', // Blue gradient for the Login button
                            '&:hover': {
                                background: 'linear-gradient(to right, #1976D2, #42A5F5)', // Darker blue gradient on hover
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}