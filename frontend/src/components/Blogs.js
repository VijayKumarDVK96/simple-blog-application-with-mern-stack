import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import {
  Grid
} from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}api/blog`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if(firstLoad) {
      sendRequest().then((data) => setBlogs(data.blogs));
      setFirstLoad(false);
    }
  }, [firstLoad]);
  // console.log(blogs);

  return (
    <>
      <Grid container>
        {blogs &&
          blogs.map((blog) => (
            <Blog 
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
            />
        ))}
      </Grid>
    </>
  );
};

export default Blogs;
