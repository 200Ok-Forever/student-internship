import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../store/UserContext";

const ChatFeedTop = ({ chat }) => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ backgroundColor: "white", height: "40px" }}>
      <Typography
        sx={{ textAlign: "center" }}
        color="primary"
        fontWeight="700"
        variant="h6"
        mt="10px"
      >
        {chat?.people[0]?.person?.username === user.uid.toString()
          ? chat?.people[1]?.person?.first_name
          : chat?.people[0]?.person?.first_name}
      </Typography>
    </Box>
  );
};

export default ChatFeedTop;
