import moment from 'moment';
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AvatarName = ({ avatar, name, createdAt }) => {
  return (
    <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <Avatar alt="user avatar" src={avatar} />
      <Box>
        <Typography variant="h6" fontWeight={700}>
          {name}
        </Typography>
        <Typography variant="body1" color="#78909c">
          {moment(createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default AvatarName;
