import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [errorMsg, setErrorMsg] = useState('');

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}api/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      });

      const data = res.data;
      setErrorMsg('');
      return data;
    } catch (error) {
      setErrorMsg(error.response.data.message.message);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    sendRequest()
      .then((data) => {
        if(data)
          navigate("/blogs")
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center" }}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3} 
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography 
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Add New Blog
          </Typography>
          <InputLabel sx={labelStyles}>
            Title
          </InputLabel>
          <TextField 
            name="title"
            onChange={handleChange}
            value={inputs.title} 
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>
            Description
          </InputLabel>
          <TextField 
            name="description"
            onChange={handleChange}
            value={inputs.description} 
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField 
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL} 
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4, width: "100px" }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>

          <p style={{ color: "#f00", marginTop: "10px" }}>{errorMsg}</p>
        </Box>
      </form>
    </>
  );
};

export default AddBlog;
