import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

const CmtTextField = ({ sendHandler }) => {
  const [text, setText] = useState("");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        id="outlined-multiline-static"
        placeholder="Any question or thought for this internship ?"
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ width: "100%" }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => sendHandler(text)}
        sx={{ alignSelf: "flex-end" }}
      >
        Send
      </Button>
    </Box>
  );
};

export default CmtTextField;
