import { AppBar, Toolbar, Typography, Box, Grid } from '@mui/material';
import { Link } from "react-router-dom"; 
import AuthChecker from '../AuthChecker';

export default function Home() {
    return (
        <>
        <AuthChecker/>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#424242' }}>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        TaskMan (beta) 
                    </Typography>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }} >
                        <Typography variant="button">Home</Typography>
                    </Link>
                    <Link to="/tasks" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                        <Typography variant="button">My Tasks</Typography>
                    </Link>
                    <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button">Logout</Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    width: '1000px',
                    minHeight: 'calc(100vh - 64px - 2px)',
                    border: '1px solid gray',
                    marginTop: '-1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '16px',
                    boxSizing: 'border-box',
                }}
            >
                <Typography variant="h5" color="textSecondary">
                    Howdy! Welcome to TaskMan (beta)
                </Typography>
            </Box>
        </Box>
        </>
    );
}