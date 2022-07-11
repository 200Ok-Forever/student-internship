import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TitleWithIcon = ({ icon, text, mb, mt }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        alignSelf: "flex-start",
        mb: mb,
        mt: mt,
      }}
    >
      {icon}
      <Typography variant="h6" fontWeight="700">
        {text}
      </Typography>
    </Box>
  );
};

export default TitleWithIcon;
