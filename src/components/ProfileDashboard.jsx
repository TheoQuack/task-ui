import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Button, CircularProgress } from '@mui/material'; 

const ProfileDashboard = () => {

    const { auth, logout } = useAuth();
    const [ profileData, setProfileData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        const fetchProtectedData = async () => {
            try{ 
                const res = await fetch('./api/profile', {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch profile data');

                const data = await res.json();
                setProfileData(data);
            }
            catch (err) {
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        };
        if (!auth) {
            return <Typography variant='h6'> You are not logged in</Typography>;
        }
        if (loading) {
            return <CircularProgress/>;
        }
    } 
    )

    return (
        <Box p={3} >
            <Typography variant="h4"> Welcome, {auth.user.name} </Typography>
            <Typography> Email: {auth.email.user} </Typography>
            <Typography> UserID: {auth.user.id} </Typography>

            <Box mt={2}>
                <Typography variant={'h6'}>Protected Profile Data:</Typography>
                <pre>{JSON.stringify(profileData, null, 2)}</pre>
            </Box>

            <Button variant='contained' color='secondary' onClick={logout} sx={{ mt: 2 }}>
                Logout
            </Button>
        </Box>
    )
}

export default ProfileDashboard;