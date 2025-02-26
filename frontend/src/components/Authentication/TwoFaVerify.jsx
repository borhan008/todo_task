import React, { useState } from 'react'
import { Typography, Box, TextField, Button } from '@mui/material';
import api from '../../service/api';
export default function TwoFaVerify({email, name}) {

const [otp, setOtp] = useState('');
const [error, setError] = useState('');

const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await api.post('/auth/2fa/verify', {
            otp: otp,
            email: email,
        });
        console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
    } catch (error) {
        console.error('Error during two factor verification:', error);
        setError('Invalid OTP. Please try again.');
    }

}
  return (
    <div>
        <Typography component="h1" variant="h5" className='text-center font-bold'>
                      Two Factor Verification
          </Typography>
          <Typography component="p" variant="body2" className='text-center'>
            {name}, please check you authenticator app for the OTP.
          </Typography> 
           {error && <Typography component="p" variant="body2" className='text-center text-red-500'>
            {error}
           </Typography>} 
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                variant="outlined"
                margin="normal"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
                fullWidth
                label="OTP"
                name="otp"
                autoFocus
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Verify</Button>
          </Box>
         
   
    </div>
  )
}
