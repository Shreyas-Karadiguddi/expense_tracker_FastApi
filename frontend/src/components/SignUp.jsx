import React, { useEffect, useState } from "react";
import { Container,Card, CardContent, TextField, Button, Typography, Avatar, Box, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as loginActions from '../actions/login_api';


const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(""); // State to store error message

  const {data:signUpData,mutate:sendSignUpData} = loginActions.useUserSignUp()

  // useEffect(() => {
  //   if(signUpData){console.log('response',signUpData)}
  // },[signUpData]) 

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    sendSignUpData({
      username,
      password
    },
    {
    onSuccess: (data) => {
      console.log("Sign Up successful:", data);
      // Handle successful login (e.g., redirect or show a success message)
    },
    onError: (error) => {
      console.error("Sign Up  failed:", error);
      setError(error.response?.data?.detail || "An error occurred"); // Update error state
    },
  }
  );
  };


  return (
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
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>} {/* Display error message */}
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
  );
};

export default SignUp;
