import React from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../service/api";
import { toast } from "react-hot-toast";
export default function EmailVerify({ message, setIsEmailVerified, email }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmailVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/email/verify", {
        email: email,
        otp: verificationCode,
      });
      console.log(response);
      setIsEmailVerified(true);
      setLoading(false);
      toast.success("Email verified successfully");
    } catch (error) {
      console.error("Error during email verification:", error);
      setError("Invalid OTP. Please try again.");
      setLoading(false);
      toast.error("Invalid OTP. Please try again.");
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          className="text-center font-bold"
        >
          Email Verification
        </Typography>
        <Typography component="p" variant="body2" className="text-center">
          {message}
        </Typography>
        {error && (
          <Typography
            component="p"
            variant="body2"
            className="text-center text-red-500"
          >
            {error}
          </Typography>
        )}

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
      </Paper>
    </Container>
  );
}
