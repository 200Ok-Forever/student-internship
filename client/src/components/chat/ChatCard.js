import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { ChatEngineContext } from "react-chat-engine";

const ChatCard = ({ chat, index }) => {
  const { activeChat, setActiveChat } = useContext(ChatEngineContext);

  return (
    <Box
      sx={{
        height: "80px",
        backgroundColor: chat?.id === activeChat ? "#d9d9d9" : "white",
        borderRadius: "20px",
        px: "15px",
        py: "10px",
        cursor: "pointer",
      }}
      onClick={() => setActiveChat(chat.id)}
    >
      {chat?.people && (
        <>
          <Typography fontWeight="700">
            {chat?.people[1]?.person?.first_name}
          </Typography>
          <Typography sx={{ mt: "10px" }} variant="subtitle2" color="#9d9d9d">
            {chat?.last_message.text}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ChatCard;
