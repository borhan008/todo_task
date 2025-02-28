import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading";
import { useAuth } from "../../context/authContext";
export default function TwoFaVerify({ email, name }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const response = await api.post("/auth/2fa/verify", {
        otp: otp,
        email: email,
      });
      setLoading(false);
      signIn(response.data.token);
      toast.success("Welcome back.");
    } catch (error) {
      console.error("Error during two factor verification:", error);
      setError("Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              Two Factor Verification
            </Typography>
            <Typography component="p" variant="body2" className="text-center">
              Hello <strong>{name}</strong>, please check you authenticator app
              for the OTP.
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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              >
                Verify
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
