import React, {useState } from "react";
import { Container,Card, CardContent, TextField, Button, Typography, Avatar, Box, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import * as loginActions from '../actions/login_api';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const {mutate:sendSignUpData} = loginActions.useUserSignUp()


  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendSignUpData({
      username,
      password,
      confirmPassword
    },
    {
    onSuccess: (data) => {
      console.log("Sign Up successful:", data);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Sign Up failed:", error);
      setError(error.response?.data?.detail || "An error occurred"); // Update error state
    },
  }
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
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
             <TextField
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              type="password"
              onChange={handleConfirmPassword}
              fullWidth
              margin="normal"
              required
            />           
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>} {/* Display error message */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p>Already with us?</p>
              <Link to="/login" style={{ marginLeft: '10px' }}>Hop In!</Link>
            </div>            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Container>
  </div>
  );
};

export default SignUp;
