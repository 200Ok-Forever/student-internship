import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import classes from "./NavBar.module.scss";
import Menu from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import Logo from "../../asset/logo.svg";

const NavBar = () => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "80px" }}>
        <Toolbar className={classes.container}>
          <div className={classes.align}>
            {/* mobile */}
            <MenuIcon
              className={classes["drawer-icon"]}
              onClick={() => setOpenDrawer(true)}
              color="secondary"
            />
            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer()}>
              <Menu className={classes.drawer} isDrawer={true} />
            </Drawer>
            {/* logo */}
            <img src={Logo} alt="logo" width="180px" />
            {/* laptop */}
            <Menu className={classes.menu} isDrawer={false} />
          </div>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ height: "55px" }}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
