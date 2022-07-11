import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import classes from "./UI.module.scss";

const Process = ({ isLastOne, text, num }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div className={classes.circle}>{num}</div>
        <Typography>{text}</Typography>
      </Box>
      {!isLastOne && <div className={classes.divider}></div>}
    </Box>
  );
};

export default Process;
