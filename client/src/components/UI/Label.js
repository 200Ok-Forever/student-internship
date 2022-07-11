import { Paper, Typography } from "@mui/material";
import React from "react";

const Label = (props) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "fit-content",
        display: "flex",
        px: "14px",
        py: "4px",
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: "20px",
        background: "",
      }}
    >
      {props.children}
      <Typography variant="body2" gutterBottom component="div" sx={{ m: 0 }}>
        {props.text}
      </Typography>
    </Paper>
  );
};

export default Label;
