/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory, Link as RouterLink } from "react-router-dom";
import classes from "./NavBar.module.scss";
import Menu from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menu as MUIMenu,
  MenuItem,
  Drawer,
  IconButton,
  Avatar,
} from "@mui/material";
import Logo from "../../asset/logo.svg";
import ChatIcon from "@mui/icons-material/Chat";
import { UserContext } from "../auth/UserContext";
import { LogoutAPI } from "../../api/auth-api";

const NavBar = () => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(false);
  };

  // const [errorModalState, setErrorModalState] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const handleErrorOpen = (msg) => {
  //   setErrorMessage(msg);
  //   setErrorModalState(true);
  // };
  // const handleErrorClose = () => setErrorModalState(false);

  const { user, setUser } = useContext(UserContext);
  const loginState = user === "" ? false : true;
  console.log(user, loginState);

  const LogoutHandler = () => {
    const logout = async () => {
      try {
        const res = await LogoutAPI(user.token);
        if (res.status === true) {
          // If success, clear userInfo
          setUser("");
          history.push("/");
        } else if (
          res.response.status === 404 ||
          res.response.status === 403 ||
          res.response.status === 400
        ) {
          console.log(res.response.data.message);
          //handleErrorOpen(res.response.data.message);
        } else {
          console.log(res);
          console.log(user, loginState);
        }
      } catch (err) {
        console.log(err);
      }
    };
    document.cookie = "user" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    logout();
    setUser("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: "80px" }} color="secondary">
        <Toolbar className={classes.container}>
          <div className={classes.align}>
            {/* mobile */}
            <MenuIcon
              className={classes["drawer-icon"]}
              onClick={() => setOpenDrawer(true)}
            />
            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer()}>
              <Menu className={classes.drawer} isDrawer={true} />
            </Drawer>
            {/* logo */}
            <img
              src={Logo}
              alt="logo"
              width="180px"
              onClick={() => history.push("/")}
            />
            {/* laptop */}
            <Menu className={classes.menu} isDrawer={false} />
          </div>
          <Box>
            {!user.token ? (
              <Button
                variant="outlined"
                sx={{ height: "55px" }}
                onClick={() => history.push("/login")}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="user-menu-appbar"
                  aria-haspopup="true"
                  onClick={() => history.push("/chat")}
                  color="primary"
                >
                  <ChatIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="user-menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <Avatar />
                </IconButton>
                <MUIMenu
                  id="user-menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/saved"
                  >
                    Saved Internships
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/history"
                  >
                    History
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to="/forum/me"
                  >
                    My Forum Posts
                  </MenuItem>
                  <MenuItem
                    onClick={LogoutHandler}
                    component={RouterLink}
                    to="/"
                  >
                    Logout
                  </MenuItem>
                </MUIMenu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
