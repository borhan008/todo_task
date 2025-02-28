import React from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          className="text-center font-bold"
        >
          Error
        </Typography>
        <Typography variant="body1" component="p" className="text-center">
          The page you are looking for does not exist.
        </Typography>
        <Link to="/" className="text-center">
          Go to Home
        </Link>
      </Paper>
    </Container>
  );
}
