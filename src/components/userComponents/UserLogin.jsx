import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth(); //

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password); //

        const payload = {
            email: email,
            password: password
        }

        try {
            await login(payload); //
            navigate('/tasks'); //
        } catch (err) {
            setError("Invalid Credentials"); //
            console.log(err); //
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            {/* Outer Box: This is the main card container that gets the overall padding */}
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper', //
                    borderRadius: '12px', //
                    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)', //
                    overflow: 'hidden', //
                    border: '1px solid rgba(0, 0, 0, 0.05)', //
                    // *** APPLY MAIN CARD PADDING HERE ***
                    px: 10, // Horizontal padding for the entire card's content (e.g., 48px left/right)
                    pb: 10, // Padding at the bottom of the card (e.g., 40px)
                }}
            >
                {/* Header Box: Remains mostly the same, its padding is for its own content */}
                <Box
                    sx={{
                        width: 'calc(100% + 48px)', // Extend header to full width including outer box's padding
                        ml: '-24px', // Shift left by half of px value (48px / 2 = 24px)
                        mr: '-24px', // Shift right by half of px value
                        backgroundColor: '#424242', //
                        padding: '60px', // Header's own internal padding
                        textAlign: 'center', //
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)', //
                        mb: 4, // Margin-bottom to separate header from form
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h1" //
                        sx={{
                            color: 'white', //
                            fontWeight: 600, //
                            letterSpacing: '0.05em', //
                        }}
                    >
                        TaskMan(beta) Login
                    </Typography>
                </Box>

                {/* Inner Box: Contains the form elements, it fills the space available after outer box padding */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%', // Fills the available space within the outer Box's padding
                        display: 'flex', //
                        flexDirection: 'column', //
                        gap: 5, // Vertical spacing between form elements (40px)
                        pt: 1, // Small padding top for form if needed below header
                    }}
                >
                    <TextField
                        margin="none" //
                        required //
                        fullWidth //
                        id="email-input" //
                        label="Email Address" //
                        name="email" //
                        autoComplete="email" //
                        autoFocus //
                        placeholder='Enter your email' //
                        type="email" //
                        value={email} //
                        onChange={(e) => { setEmail(e.target.value) }} //
                        variant="outlined" //
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#bdbdbd', //
                                },
                                '&:hover fieldset': {
                                    borderColor: '#9e9e9e', //
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2196F3', //
                                },
                                // *** Padding inside the input text field itself (keeps text from edges) ***
                                '& .MuiInputBase-input': {
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    paddingTop: '14px',
                                    paddingBottom: '14px',
                                },
                            },
                        }}
                    />
                    <TextField
                        margin="none" //
                        required //
                        fullWidth //
                        id="password-input" //
                        label="Password" //
                        name="password" //
                        autoComplete="current-password" //
                        placeholder='Enter your password' //
                        type="password" //
                        value={password} //
                        onChange={(e) => { setPassword(e.target.value) }} //
                        variant="outlined" //
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#bdbdbd', //
                                },
                                '&:hover fieldset': {
                                    borderColor: '#9e9e9e', //
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2196F3', //
                                },
                                // *** Padding inside the input text field itself (keeps text from edges) ***
                                '& .MuiInputBase-input': {
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    paddingTop: '14px',
                                    paddingBottom: '14px',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit" //
                        fullWidth //
                        variant="contained" //
                        size="large" //
                        sx={{
                            mt: 1, //
                            py: 1.5, //
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', //
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', //
                            borderRadius: '8px', //
                            fontWeight: 700, //
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1976D2 30%, #17A2B8 90%)', //
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .5)', //
                            },
                        }}
                    >
                        Login
                    </Button>
                    {error && ( //
                        <Typography
                            color="error" //
                            variant="body2" //
                            align="center" //
                            sx={{ mt: 2 }} //
                        >
                            {error}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
}