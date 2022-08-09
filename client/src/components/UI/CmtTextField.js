import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../store/UserContext";

// isCmt => true -- comment, false -- reply
const CmtTextField = ({
  sendHandler,
  sx = {},
  isCmt,
  cmtId = -1,
  placeholder,
}) => {
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);

  const sendInfo = () => {
    const new_info = {
      text: text,
      uid: user.uid,
      avatar: user.avatar,
      username: user.username,
    };
    if (isCmt) {
      sendHandler(new_info);
    } else {
      sendHandler(cmtId, new_info);
    }
    setText("");
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
      <Box
        sx={{ alignSelf: "flex-end", display: "flex", alignItems: "center" }}
      >
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendInfo}
          disabled={text === ""}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default CmtTextField;
