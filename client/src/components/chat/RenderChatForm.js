import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { ChatEngineContext, getOrCreateChat } from "react-chat-engine";

const RenderChatForm = ({ creds }) => {
  const { setActiveChat, conn } = useContext(ChatEngineContext);
  const chatId = localStorage.getItem("chat");

  useEffect(() => {
    if (conn?.userName && chatId) {
      getOrCreateChat(
        creds,
        { is_direct_chat: true, usernames: [chatId] },
        (data) => {
          setActiveChat(data.id);
        }
      );
      localStorage.removeItem("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, conn?.userName]);

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{ mb: "10px" }}
        color="primary"
      >
        Chats
      </Typography>
    </Box>
  );
};

export default RenderChatForm;
