import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { Paper } from "@mui/material";

const ResumeSectionBar = (props) => {
  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        width: "400px",
        height: "35px",
      }}
    >
      <IconButton size="large" edge="start" color="inherit" aria-label="menu">
        <ClearIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        {props.title}
      </Typography>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  );
};

export default ResumeSectionBar;
