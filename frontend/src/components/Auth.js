import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    let data = null;

    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}api/user/${type}`, {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        });

      data = await res.data;
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(error.response.data.message.message ?? error.response.data.message);
    }

    return data;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;

    data = (isSignup) ? await sendRequest("signup") : await sendRequest();

    if (data && data.user) {
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.login());
      navigate("/blogs");
    }
  };

  return (
    <div>
      <form className="authForm" onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5} 
          sx={{ background: "#2c3e50" }}
        >
          <Typography variant="h2" className="authHeading" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              type={"text"}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>

          <p style={{ color: "#f1c40f", fontWeight: 700, marginTop: "10px" }}>{errorMsg}</p>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
