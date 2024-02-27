import { Button, InputLabel, TextField, Typography, Grid, Card, CardContent, CardHeader, CardMedia, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const ViewBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [userName, setUserName] = useState('');
  const id = useParams().id;
//   console.log(id);
  
  const fetchDetails = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const fetchUserDetails = async (userid) => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}api/blog/user/${userid}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
    });
  }, [id]);

  useEffect(() => {
    fetchUserDetails(blog.user).then((data) => {
      setUserName(data.user.name);
    });
  }, [blog])
  

  return (
    <>
      <Grid item sm={12} md={12} sx={{ padding: 2 }}>
        <Card
            sx={{
            mt: 2,
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item sm={11} md={11}>
              <h3 style={{ margin: '15px 0', height: "45px" }}>{blog.title}</h3>
            </Grid>

            <Grid item sm={1} md={1}>
                <Link to="/blogs" style={{ textDecoration: 'none' }}>
                    <Button
                    sx={{ borderRadius: 4 }}
                    variant="contained"
                    color="primary"
                    type="button"
                    >
                    Go Back
                    </Button>
                </Link>
            </Grid>
          </Grid>

          <CardMedia
            component="img"
            height="200"
            image={blog.image}
            alt="Blog"
          />

          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item sm={12} md={12}>
                <CardContent sx={{ padding: "0 !important" }}>
                    <CardHeader
                    avatar={
                        <Avatar 
                        sx={{ bgcolor: "red" }}
                        aria-label="recipe"
                        >
                        {userName ? userName.charAt(0) : ""}
                        </Avatar>
                    }
                    title={userName}
                    sx={{ paddingLeft: 0 }}
                    />
                </CardContent>
                
                <p style={{ textAlign: "justify", marginTop: "10px" }}>{blog.description}</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default ViewBlog;
