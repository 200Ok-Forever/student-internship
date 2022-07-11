import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

// isCmt => true -- comment, false -- reply
const CmtTextField = ({
  sendHandler,
  sx = {},
  isCmt,
  cmtId = -1,
  placeholder,
}) => {
  const [text, setText] = useState("");

  const sendInfo = () => {
    const new_info = {
      text: text,
      avatar:
        "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2366&q=80",
      username: "new",
    };
    if (isCmt) {
      sendHandler(new_info);
    } else {
      sendHandler(cmtId, new_info);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        ...sx,
      }}
    >
      <TextField
        id="outlined-multiline-static"
        placeholder={placeholder}
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ width: "100%" }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={sendInfo}
        sx={{ alignSelf: "flex-end" }}
        disabled={text === ""}
      >
        Send
      </Button>
    </Box>
  );
};

export default CmtTextField;
