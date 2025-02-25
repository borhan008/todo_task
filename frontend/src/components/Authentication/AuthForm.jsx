import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../service/api';
import Setup2FA from './Setup2FA';

export default function AuthForm() {
    const [isRegistered, setIsRegistered] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [qrImage, setQrImage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if(formData.email === '' || formData.password === '') {
           setError('Please fill all fields');
            return;
        }
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        if(formData.name === '' || formData.email === '' || formData.password === '') {
           setError('Please fill all fields');
            return;
        }

        try {
            const response = await api.post('/auth/register', formData);
            setQrImage(response.data.qrImage);
        } catch (error) {
            console.error('Error during registration:', error);
            setError(error.response.data.message);
        }

        
        console.log('Register');
    }


  return (
    <Container maxWidth="xs">
        <Paper elevation={3}
        sx={{ padding: 4}}>

            {qrImage ?  <Setup2FA qrImage={qrImage} />  :  
            <>

                <Typography component="h1" variant="h5" className='text-center font-bold'>
                 {isRegistered ? "Login" : "Register"}
                 </Typography>
                <Typography component="p" variant="body2" className='text-center'>
                {isRegistered ? "Login to your account" : "Register to create an account"}
                </Typography>
                {error && <Typography component="p" variant="body2" color='error' className='text-center'>{error}</Typography>}
                {message && <Typography component="p" variant="body2" color='success' className='text-center'>{message}</Typography>}
                <Box component="form" sx={{mt : 2}} onSubmit={
                    isRegistered ? handleLogin : handleRegister
                }>
                    {!isRegistered && (
                        <TextField placeholder='Name' required fullWidth autoFocus sx={{mb : 2}}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    )}
                    <TextField placeholder='Email' type="email" required fullWidth  sx={{mb : 2}}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />

                    <TextField placeholder='Password' type="password" required fullWidth sx={{mb : 2}}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />

                    <Button type='submit' variant='contained' color='primary' fullWidth>
                        {isRegistered ? "Login" : "Register"}
                    </Button>

                </Box>
                {isRegistered ? <p>Already have an account? <Link to="" className='underline' onClick={() => setIsRegistered(false)}>Login</Link></p> : <p>Don't have a account ?  <Link to="" onClick={() => setIsRegistered(true)} className='underline'>Register</Link></p>}
            </>
            }
        </Paper>
    </Container>
  )
}
