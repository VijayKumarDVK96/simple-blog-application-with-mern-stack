import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import {
  Grid
} from "@mui/material";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const [firstLoad, setFirstLoad] = useState(true);

  

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(`${process.env.REACT_APP_API_URL}api/blog/user/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    if(firstLoad) {
      sendRequest().then((data) => setUser(data.user));
      setFirstLoad(false);
    }
  }, [id, firstLoad]);
  
  return (
    <>
      <Grid container>
        {user &&
          user.blogs &&
          user.blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              key={index}
              isUser={true}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={user.name}
            />
        ))}
      </Grid>
    </>
  );
};

export default UserBlogs;
