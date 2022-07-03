import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import classes from "./NavBar.module.scss";
import Menu from "./Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";

const NavBar = () => {
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
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
      <AppBar position="static">
        <Toolbar className={classes.container}>
          <div className={classes.align}>
            {/* mobile */}
            <MenuIcon
              onClick={() => setOpenDrawer(true)}
              className={classes["drawer-icon"]}
              color="secondary"
            />
            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={toggleDrawer("left", false)}
            >
              <Menu className={classes.drawer} isDrawer={true} />
            </Drawer>
            {/* logo */}
            <Typography
              variant="h6"
              component="div"
              onClick={() => history.push("/")}
            >
              InternHub
            </Typography>
            {/* laptop */}
            <Menu className={classes.menu} isDrawer={false} />
          </div>
          <Button
            color="secondary"
            variant="outlined"
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
