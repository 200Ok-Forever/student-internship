import { Avatar } from "@material-ui/core";
import { Box } from "@mui/material";
import React from "react";

const RenderChatSettingsTop = ({ creds, chat }) => {
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
          <Avatar src={chat?.people[0]?.person?.last_name}></Avatar>
          <Avatar src={chat?.people[1]?.person?.last_name}></Avatar>
        </Box>
      )}
    </>
  );
};

export default RenderChatSettingsTop;
