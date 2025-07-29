import { AppBar, Toolbar, Typography, Box, Button, Paper } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export default function Home() {

    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate()

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#424242' }}>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}> {/* Ensure text aligns left and flexGrow pushes it */}
                        TaskMan (beta)
                    </Typography>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }} >
                        <Typography variant="button">Profile</Typography>
                    </Link>
                    <Link to="/tasks" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                        <Typography variant="button">My Tasks</Typography>
                    </Link>
                    {isAdmin && (
                    <Link to="/users" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                        <Typography variant="button">UserList</Typography>
                    </Link>
                    )}
                    <Button onClick={()=>{logout(); navigate('/login')}} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button">Logout</Typography>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 64px)', // Account for AppBar height
                    backgroundColor: '#f5f5f5', // Light background for the overall page
                    padding: '2px', // Padding around the central content area
                    boxSizing: 'border-box',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '1200px', // Original broad width
                        maxWidth: '90%', // Keep a max-width for responsiveness
                        minHeight: 'calc(100vh - 64px - 32px)', // Adjusted height, still accounting for padding
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2px', // Current padding
                        boxSizing: 'border-box',
                        margin: 'auto', // Ensure it's centered
                    }}
                >
                    <Typography variant="h5" color="textSecondary">
                        Howdy! Welcome to TaskMan (beta)
                    </Typography>
                </Paper>
            </Box>
        </Box>
        </>
    );
}