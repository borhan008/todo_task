import React from 'react'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import api from '../../service/api';

export default function EmailVerify({message, setIsEmailVerified, email}) {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const handleEmailVerify = async(e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/email/verify', {
                email: email,
                otp: verificationCode
            });
            console.log(response);
            setIsEmailVerified(true);
        } catch (error) {
          console.error('Error during email verification:', error);
          setError('Invalid OTP. Please try again.');
        }
    }
  return (
    <div>
        <Typography component="h1" variant="h5" className='text-center font-bold'>
                     Email Verification
          </Typography>
          <Typography component="p" variant="body2" className='text-center'>
              {message}
          </Typography> 
          {error && <Typography component="p" variant="body2" className='text-center text-red-500'>
            {error}
            </Typography>}

          <Box component="form" onSubmit={handleEmailVerify}>
            <TextField
            label="Verification Code"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            fullWidth
            margin="normal"
            required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Verify
            </Button>
          </Box>
   
    </div>
  )
}
