import { Container, Paper, Typography, Box, TextField, Button } from '@mui/material'
import React from 'react'

export default function AuthForm() {
  return (
    <Container maxWidth="xs">
        <Paper elevation={3}
        sx={{ padding: 4}}>
           <Typography component="h1" variant="h5">
                Sign In
           </Typography>

            <Box component="form" sx={{mt : 2}}>

                <TextField placeholder='Email' type="email" required fullWidth autoFocus sx={{mb : 2}}/>

                <TextField placeholder='Password' type="password" required fullWidth sx={{mb : 2}}/>

                <Button type='submit' variant='contained' color='primary' >
                    Sign In
                </Button>

            </Box>
        </Paper>
    </Container>
  )
}
