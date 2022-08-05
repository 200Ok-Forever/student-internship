import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getOrCreateChat } from "react-chat-engine";

const RenderChatForm = ({ creds }) => {
  const [username, setUsername] = useState("");

  const createDirectChat = (creds) => {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  };
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
          sx={{ width: "78%" }}
        />
        <button className="btn" onClick={() => createDirectChat(creds)}>
          Create
        </button>
      </Box>
    </Box>
  );
};

export default RenderChatForm;
