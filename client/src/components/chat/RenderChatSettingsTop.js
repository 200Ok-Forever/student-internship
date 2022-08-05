import { Avatar } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";

const RenderChatSettingsTop = ({ creds, chat }) => {
  const chatWith = chat?.people[0]?.person;
  return (
    <>
      {chat && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px auto",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Avatar src={chatWith?.avatar}></Avatar>
          <Avatar src={chat?.people[1]?.person?.avatar}></Avatar>
        </Box>
      )}
    </>
  );
};

export default RenderChatSettingsTop;
