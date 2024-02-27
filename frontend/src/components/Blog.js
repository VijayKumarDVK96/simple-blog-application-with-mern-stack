import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Button,
  Grid
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${process.env.REACT_APP_API_URL}api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"));
  };

  return (
    <>
      <Grid item sm={4} md={4} sx={{ padding: 2 }}>
        <Card
            sx={{
            height: "330px",
            mt: 2,
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item sm={10} md={10}>
              <h3 style={{ margin: '15px 0', height: "45px" }}>{title}</h3>
            </Grid>

            <Grid item sm={2} md={2}>
              {isUser && (
                <Box display="flex">
                  <IconButton onClick={handleEdit}>
                    <ModeEditOutlineIcon color="warning" />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>

          <CardMedia
            component="img"
            height="194"
            image={imageURL}
            alt="Blog"
          />

          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={8}>
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
            </Grid>

            <Grid item xs={4}>
              <Link to={`/blog/${id}`} style={{ textDecoration: 'none' }}>
                <Button
                  sx={{ borderRadius: 4, width: "150px" }}
                  variant="contained"
                  color="warning"
                  type="button"
                >
                  Read More
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default Blog;
