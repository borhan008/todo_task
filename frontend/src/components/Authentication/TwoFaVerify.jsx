import React from 'react'
import { Typography } from '@mui/material';
export default function Setup2FA() {
  return (
    <div>
        <Typography component="h1" variant="h5" className='text-center font-bold'>
                      Two Factor Verification
          </Typography>
          <Typography component="p" variant="body2" className='text-center'>
             Check you authenticator app for the OTP.
          </Typography> 

          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
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
