import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TitleWithIcon = ({ icon, text, mb }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        alignSelf: "flex-start",
        mb: mb,
      }}
    >
      {icon}
      <Typography variant="h6" fontWeight="700" fontFamily="inherit">
        {text}
      </Typography>
    </Box>
  );
};

export default TitleWithIcon;
