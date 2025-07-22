import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Typography, Box, Button, CircularProgress } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();
    const [ profileData, setProfileData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;
    
    
    useEffect(()=>{
        const fetchProtectedData = async () => {
            try{ 
                const res = await fetch(`${API_URL}/api/users/${auth.user}`, {
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
    

        if (auth?.token){
            fetchProtectedData();
            }
        }, [auth]);

        console.log(profileData)

        if (!auth) {
            return <Typography variant='h6'> You are not logged in</Typography>;
        }
        if (loading) {
            return <CircularProgress/>;
        }


        
    return (
        <Box p={3} >
            <Typography variant="h4"> Welcome, {profileData.name} </Typography>
            <Typography> Email: {profileData.email} </Typography>
            <Typography> UserID: {profileData.id} </Typography>

            <Box mt={2}>
                <Typography variant={'h6'}>Protected Profile Data:</Typography>
                <pre>{JSON.stringify(profileData, null, 2)}</pre>
            </Box>

            <Button variant='contained' color='secondary' onClick={()=>{navigate('/')}} sx={{ mt: 2 }}>
                Back
            </Button>
            <Button variant='contained' color='secondary' onClick={logout} sx={{ mt: 2 }}>
                Logout
            </Button>
        </Box>
    )



    } 

export default ProfileDashboard;