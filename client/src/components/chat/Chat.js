import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import classes from "./chat.module.scss";

const Chat = () => {
  const [username, setUsername] = useState("");

  const createDirectChat = (creds) => {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  };

  const renderChatForm = (creds) => {
    return (
      <Box>
        <Typography variant="h5" fontWeight="700" sx={{ mb: "10px" }}>
          Chats
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            mb: "20px",
          }}
        >
          <TextField
            id="chat-name"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
            sx={{ width: "300px", minWidth: "150px" }}
          />
          <button
            className={classes.btn}
            onClick={() => createDirectChat(creds)}
          >
            Create
          </button>
        </Box>
      </Box>
    );
  };

  // TODO: change uername and usersecret
  return (
    <ChatEngine
      projectID="e7fb7381-46fd-413f-9422-766a54881ff6"
      userName="student1"
      userSecret="a"
      height="80vh"
      renderNewChatForm={(creds) => renderChatForm(creds)}
      // renderNewMessageForm={(creds, chatId) => {
      //   console.log(chatId);
      // }}
    />
  );
};

export default Chat;
