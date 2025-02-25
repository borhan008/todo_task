import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function AuthForm() {
    const [isRegistered, setIsRegistered] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login');
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Register');
    }

    
  return (
    <Container maxWidth="xs">
        <Paper elevation={3}
        sx={{ padding: 4}}>
           <Typography component="h1" variant="h5" className='text-center'>
            {isRegistered ? "Login" : "Register"}
           </Typography>
           <Typography component="p" variant="body2" className='text-center'>
            {isRegistered ? "Login to your account" : "Register to create an account"}
            </Typography>

            <Box component="form" sx={{mt : 2}} onSubmit={
                isRegistered ? handleLogin : handleRegister
            }>
                {!isRegistered && (
                    <TextField placeholder='Name' required fullWidth autoFocus sx={{mb : 2}}/>
                )}
                <TextField placeholder='Email' type="email" required fullWidth  sx={{mb : 2}}/>

                <TextField placeholder='Password' type="password" required fullWidth sx={{mb : 2}}/>

                <Button type='submit' variant='contained' color='primary' >
                    {isRegistered ? "Login" : "Register"}
                </Button>

            </Box>
            {isRegistered ? <p>Already have an account? <Link to="" className='hover:underline' onClick={() => setIsRegistered(false)}>Login</Link></p> : <p>Don't have a account ?  <Link to="" onClick={() => setIsRegistered(true)} className='hover:underline'>Register</Link></p>}
        </Paper>
    </Container>
  )
}
