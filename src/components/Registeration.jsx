import {Box, TextField, Button} from '@mui/material'
import { useState } from 'react'

export default function Registration(){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) =>{

        e.preventDefault();

        try {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "name": name,
            "birthDate": "2004-10-24",
            "role": "user",
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        

        } catch(err){
            console.log(err)
        }

    }
    

    return (

        <Box component="form" onSubmit={handleSubmit}>
                <TextField id="outlined-controlled" label="Enter Your Name" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <TextField id="outlined-controlled" label="Enter Your Email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <TextField id="outlined-controlled" label="Enter Your Password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <TextField id="outlined-controlled" label="Confirm Your Password" placeholder='Confirm Password' />
                <button type='submit'>Submit</button>
        </Box>

    )

}
