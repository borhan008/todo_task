import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function Settings() {
  return (
    <Container>
    <Box>
        <Typography variant='h5'>Settings</Typography>
        <Button variant='contained' color='primary' sx={{marginTop: 2}}>
            Connect Google Account
        </Button>
    </Box>
    </Container>
  )
}
