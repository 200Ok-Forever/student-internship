import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AvatarName = ({ avatar, name }) => {
  return (
    <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Avatar alt="user avatar" src={avatar} />
      <Typography variant="h6" fontWeight={700} fontFamily="inherit">
        {name}
      </Typography>
    </Box>
  );
};

export default AvatarName;
