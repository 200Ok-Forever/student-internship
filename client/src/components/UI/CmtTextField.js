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
      // TODO
      uid: 102,
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
        fullWidth
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
