import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import Setup2FA from "./Setup2FA";
import EmailVerify from "./EmailVerify";
import TwoFaVerify from "./TwoFaVerify";
import Loading from "../../pages/Loading";
import toast from "react-hot-toast";
export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [qrImage, setQrImage] = useState("");

  const [name, setName] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (formData.email === "" || formData.password === "") {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);
      setMessage(
        `Welcome ${response.data.name} , please check your email for verification code`
      );
      setName(response.data.name);
      setIsLoginSuccess(true);
      toast.success(`Welcome ${response.data.name} , please check your email for verification code`);
      setLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", formData);
      setQrImage(response.data.qrImage);
      setLoading(false);
      toast.success("Scan the QR code to setup 2FA");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response.data.message);
      setLoading(false);
      toast.error(error.response.data.message);
    }

    console.log("Register");
  };

  const handlePost2FaSetup = (e) => {
    e.preventDefault();
    setLoading(true);
    setQrImage("");
    setIsRegistered(true);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isEmailVerified ? (
            <TwoFaVerify email={formData.email} name={name} />
          ) : isLoginSuccess ? (
            <EmailVerify
              message={message}
              setIsEmailVerified={setIsEmailVerified}
              email={formData.email}
            />
          ) : qrImage ? (
            <>
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
                  <Setup2FA qrImage={qrImage} />
                  <Typography
                    component="p"
                    variant="body1"
                    className="text-center"
                  >
                    Now you can{" "}
                    <Link
                      to=""
                      className="underline font-bold"
                      onClick={handlePost2FaSetup}
                    >
                      login
                    </Link>{" "}
                    with your email and password.
                  </Typography>
                </Paper>
              </Container>
            </>
          ) : (
            <>
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
                    {isRegistered ? "Login" : "Register"}
                  </Typography>
                  <Typography
                    component="p"
                    variant="body2"
                    className="text-center"
                  >
                    {isRegistered
                      ? "Login to your account"
                      : "Register to create an account"}
                  </Typography>
                  {error && (
                    <Typography
                      component="p"
                      variant="body2"
                      color="error"
                      className="text-center"
                    >
                      {error}
                    </Typography>
                  )}
                  {message && (
                    <Typography
                      component="p"
                      variant="body2"
                      color="success"
                      className="text-center"
                    >
                      {message}
                    </Typography>
                  )}
                  <Box
                    component="form"
                    sx={{ mt: 2 }}
                    onSubmit={isRegistered ? handleLogin : handleRegister}
                  >
                    {!isRegistered && (
                      <TextField
                        placeholder="Name"
                        required
                        fullWidth
                        autoFocus
                        sx={{ mb: 2 }}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    )}
                    <TextField
                      placeholder="Email"
                      type="email"
                      required
                      fullWidth
                      sx={{ mb: 2 }}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />

                    <TextField
                      placeholder="Password"
                      type="password"
                      required
                      fullWidth
                      sx={{ mb: 2 }}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {isRegistered ? "Login" : "Register"}
                    </Button>
                  </Box>

                  <Typography
                    component="p"
                    variant="body3"
                    className="text-center pt-4"
                  >
                    {!isRegistered ? (
                      <p>
                        Already have an account?{" "}
                        <Link
                          to=""
                          className="underline"
                          onClick={() => setIsRegistered(true)}
                        >
                          Login
                        </Link>
                      </p>
                    ) : (
                      <p>
                        Don't have an account ?{" "}
                        <Link
                          to=""
                          onClick={() => setIsRegistered(false)}
                          className="underline"
                        >
                          Register
                        </Link>
                      </p>
                    )}
                  </Typography>
                </Paper>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}
