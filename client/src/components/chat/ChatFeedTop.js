import { Box, Typography } from "@mui/material";
import React from "react";

const ChatFeedTop = ({ chat }) => {
  return (
    <Box sx={{ backgroundColor: "white", height: "40px" }}>
      <Typography
        sx={{ textAlign: "center" }}
        color="primary"
        fontWeight="700"
        variant="h6"
        mt="10px"
      >
        {chat?.people[1]?.person?.first_name}
      </Typography>
    </Box>
  );
};

export default ChatFeedTop;
