import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  // fonsa bhi function
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [action, setAction] = useState(false);

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handleOnClick = (e) => {
    setAction(!action);
    temp(action);
  };

  const temp = (ac) => {
    alert(ac);
  };

  useEffect(() => {
    console.log("Yes", action);
  }, [action]);

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
          variant={action == false ? "standard" : "outlined"}
          value={username}
          onChange={handleOnChange}
        />
        <br />
        <TextField
          label="Password"
          variant={action == false ? "standard" : "outlined"}
          value={password}
          type="password"
        />
        <br />
        <Button variant="contained" onClick={handleOnClick}>
          SignUp
        </Button>
      </div>
    </>
  );
};

export default Login;
