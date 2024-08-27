import React, { useState } from "react";
import { Container, Card, TextField, Button, Typography, Avatar, Box, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUserLogin } from "../actions/login_api";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const { mutate: sendLoginData } = useUserLogin();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    sendLoginData(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Login successful:", data);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
  
          // Navigate to the dashboard
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setError(error.response?.data?.detail || "An error occurred");
        },
      },
      
    );
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f5f5, #d0e4f4)',
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 8, p: 4, boxShadow: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleUsername}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              onChange={handlePassword}
              fullWidth
              margin="normal"
              required
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>} {/* Display error message */}
            
            
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>Don't have an account?</p>
              <Link to="/signup" style={{ marginLeft: '10px' }}>Create One!</Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}

            >
              Login
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
    </div>
  );
};

export default Login;
