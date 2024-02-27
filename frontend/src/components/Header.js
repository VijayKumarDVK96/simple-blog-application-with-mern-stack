import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState(1);

  React.useEffect(() => {
    switch (location.pathname) {
      case '/blogs':
        setValue(1);
        break;
      case '/myBlogs':
        setValue(2);
        break;
      case '/blogs/add':
        setValue(3);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#252323",
      }}
    >
      <Toolbar>
        <img src="/logo.png" alt="logo" style={{ height: "50px" }}/>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"25px"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab 
                value={1}
                component={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab 
                value={2}
                component={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab 
                value={3}
                component={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                component={Link}
                to="/auth/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/auth/signup"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              component={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
