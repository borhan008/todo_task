import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../context/authContext';

export default function Settings() {
  const {user, loading} = useAuth();
  const handleGoogleConnect = () => {
    window.location.href = import.meta.env.VITE_BACKEND_GOOGLE_URL;
  };
  
  return (
    <Container>
    <Box>
        <Typography variant='h5'>Settings</Typography>
        {!user.connectedWithGoogle ? (
          <>            
            <Typography variant='body1' component='p'>
                Please must select the google calendar you want to connect to your account.
            </Typography>
            <Button onClick={handleGoogleConnect} variant='contained' color='primary' sx={{marginTop: 2}}>
                Connect Google Account
            </Button>
          </>

        ) : (
            <Typography variant='body1' component='p'>
                Google account connected to {user.email}
            </Typography>
        )}   
    </Box>
    </Container>
  )
}
