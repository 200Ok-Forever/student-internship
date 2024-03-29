import React from "react";
import { Box, Typography } from "@mui/material";

const ErrorMessage = (props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {props.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.errorMessage}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
