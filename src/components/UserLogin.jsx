import {Box, TextField, Button} from '@mui/material'
import { useState } from 'react';

export default function UserLogin() {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
    
    
        const handleSubmit = async (e) =>{
    
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
            .then(result => {console.log(result)
             localStorage.setItem("TOKEN", encodeURI(result.token))})
            .catch(error => console.log('error', error));
            
    
            } catch(err){
                console.log(err)
            }
    
        }

    return (
        <Box component="form" onSubmit={handleSubmit}>
                <TextField id="outlined-controlled" label="Enter Your Email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <TextField id="outlined-controlled" label="Enter Your Password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type='submit'>Submit</button>
        </Box>
    )

} 