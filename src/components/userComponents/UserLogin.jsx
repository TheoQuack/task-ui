import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const { login, checkAdminRole } = useAuth();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email,password);

        const payload = {
            email: email,
            password: password
        }

        try{
            await login(payload)
            await checkAdminRole();
            navigate('/profile')
        } catch (err){
            setError("Invalid Credentials");
            console.log(err)
        }
    };
    

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
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    );
}