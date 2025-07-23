import { useState  } from  'react';
import { TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {

    const navigate = useNavigate();

    const { login, checkAdminRole } = useAuth();
    const [ form, setForm ] = useState({ email: '', password: ''});
    const [ error, setError ] = useState(null);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await login(form)
            await checkAdminRole();
            navigate('/profile')
        } catch (err){
            setError("Invalid Credentials");
            console.log(err)
        }
    };


    return (

        <form onSubmit={handleSubmit}>
            <Typography variant='h5'>Login</Typography>
            <TextField 
            name='email'
            label='Email'
            fullWidth
            margin='normal'
            value={form.email}
            onChange={handleChange}
            />
            <TextField 
            name="password"
            type="password"
            label="Password"
            fullWidth
            margin='normal'
            value={form.password}
            onChange={handleChange}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type='submit' variant='contained' >Login</Button>
        </form>
    );
};