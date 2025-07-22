import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from '../../context/AuthContext';

export default function Home() {

    const { logout } = useAuth();
    const navigate = useNavigate()

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#424242' }}>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        TaskMan (beta) 
                    </Typography>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }} >
                        <Typography variant="button">Profile</Typography>
                    </Link>
                    <Link to="/tasks" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                        <Typography variant="button">My Tasks</Typography>
                    </Link>
                    <Link to="/users" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                        <Typography variant="button">UserList</Typography>
                    </Link>
                    <Button onClick={()=>{logout(); navigate('/login')}} style={{ textDecoration: 'none', color: 'white' }}>
                        <Typography variant="button">Logout</Typography>
                    </Button>
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