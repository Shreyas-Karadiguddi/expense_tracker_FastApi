import React, { useEffect } from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as loginActions from '../actions/login_api'


const Login = () => {
  // fonsa bhi function
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const {data:loginData,mutate:sendLoginData} = loginActions.useUserLogin()

  useEffect(() => {
    if(loginData){console.log('response',loginData)}
  },[loginData]) 

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    sendLoginData({
      username,
      password
    })
  };


  return (
    <>
      <div
        style={{
          marginLeft: "400px",
          marginRight: "400px",
          marginTop: "50px",
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsername}
        />
        <br />
        <TextField
          label="Password"
          variant= "outlined"
          value={password}
          type="password"
          onChange={handlePassword}
        />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
