import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

// sample: internship applicaiton form
const FormHead = ({ title, company_name, avatar }) => {
  const center = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    width: "90%",
    justifyContent: "center",
    pb: "20px",
  };
  return (
    <Box
      sx={{
        ...center,
        flexDirection: "column",
        borderBottom: "1px #ccc solid",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Box sx={center}>
        <Avatar
          src={avatar}
          arc="company avatar"
          sx={{ width: "30px", height: "30px" }}
        />
        <Typography variant="subtitle1">{company_name}</Typography>
      </Box>
    </Box>
  );
};

export default FormHead;
