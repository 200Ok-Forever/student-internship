/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory, Link as RouterLink } from "react-router-dom";
import classes from "./NavBar.module.scss";
import SideMenu from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, Drawer, IconButton, Avatar } from "@mui/material";
import Logo from "../../asset/logo.svg";
import ChatIcon from "@mui/icons-material/Chat";
import { UserContext } from "../../store/UserContext";
import { LogoutAPI, getShortUserInfo } from "../../api/auth-api";

const NavBar = () => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  let open;
  if (user.token) {
    open = Boolean(anchorEl);
  }
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

  const LogoutHandler = () => {
    setAnchorEl(false);
    const logout = async () => {
      try {
        const res = await LogoutAPI(user.token);
        if (res.status === true) {
          // If success, clear userInfo
          setUser({});
          window.localStorage.clear();
          history.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    logout();
    setUser({});
    window.localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    const update = async () => {
      if (user.token) {
        const res = await getShortUserInfo(user.uid);
        setUser({ ...res, token: user.token });
        setAvatar(res.avatar);
      }
    };
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

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
              <SideMenu className={classes.drawer} isDrawer={true} />
            </Drawer>
            {/* logo */}
            <img
              src={Logo}
              alt="logo"
              width="180px"
              onClick={() => history.push("/")}
            />
            {/* laptop */}
            <SideMenu className={classes.menu} isDrawer={false} />
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
                  onClick={() => window.open(`/chat`, "_blank")}
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
                  <Avatar src={avatar} />
                </IconButton>
              </>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to={user.role === 1 ? "/profile" : `/company?id=${user.uid}`}
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
              <MenuItem onClick={LogoutHandler} component={RouterLink} to="/">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
