import React from 'react'
import { Typography } from '@mui/material';
export default function Setup2FA({qrImage}) {
  return (
    <div>
        <Typography component="h1" variant="h5" className='text-center font-bold'>
                      Two Factor Authentication
          </Typography>
          <img src={qrImage} alt="QR Code" className='w-[70%] mx-auto my-8 border-10 border-gray-600 rounded-md' />

          <Typography component="p" variant="body2" className='text-center'>
              Scan the QR code with your authenticator app to verify your account in future.
          </Typography> 
    </div>
  )
}
