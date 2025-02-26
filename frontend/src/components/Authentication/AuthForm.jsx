import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../service/api';
import Setup2FA from './Setup2FA';
import EmailVerify from './EmailVerify';

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
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    

    const handleLogin = async(e) => {
        e.preventDefault();
        setError('');
        if(formData.email === '' || formData.password === '') {
           setError('Please fill all fields');
            return;
        }

        try {
            const response = await api.post('/auth/login', formData);
            setMessage(`Welcome ${response.data.name} , please check your email for verification code`);
            setIsLoginSuccess(true);
        } catch (error) {
            console.error('Error during login:', error);
            setError(error.response.data.message);
        }
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        setError('');
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


    const handlePost2FaSetup = (e) => {
        e.preventDefault();
        setQrImage("");
        setIsRegistered(true);
    }

  return (
    <Container maxWidth="xs">
        <Paper elevation={3}
        sx={{ padding: 4}}>
     { 
     isEmailVerified ? <> </> : 
            isLoginSuccess ? <EmailVerify message={message} setIsEmailVerified={setIsEmailVerified} email={formData.email} /> :
            qrImage ?  <>
                <Setup2FA qrImage={qrImage} />
                <Typography component="p" variant="body2" className='text-center'>
                    Now you can <Link to="" className='underline' onClick={handlePost2FaSetup}>login</Link> with your email and password.
                </Typography>
            </>  :  
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

                    <Button type='submit' variant='contained' color='primary' fullWidth >
                        {isRegistered ? "Login" : "Register"}
                    </Button>

                </Box>

                <Typography component="p" variant="body3"  className='text-center pt-4'>
                {!isRegistered ? <p>Already have an account? <Link to="" className='underline' onClick={() => setIsRegistered(true)}>Login</Link></p> : <p>Don't have an account ?  <Link to="" onClick={() => setIsRegistered(false)} className='underline'>Register</Link></p>}
                </Typography>
            </>
            }
        </Paper>
    </Container>
  )
}
