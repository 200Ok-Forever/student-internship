import { IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { sendMessage } from "react-chat-engine";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { UserContext } from "../../store/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const RenderNewMessageForm = ({ creds, chatID }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const handleChange = (newTime) => {
    setTime(newTime);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (text) => {
    sendMessage(creds, chatID, { text });
    setText("");
  };
  const { user } = useContext(UserContext);

  const sendInvitation = () => {
    const text = `MEETING BOT:😊Hi! ${
      user.username
    } invites you to join zoom meeting on ${time.toISOString()}`;
    handleSubmit(text);
    handleClose();
  };

  return (
    <Box
      style={{
        position: "absolute",
        bottom: "-30px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white",
        width: "49vw",
        maxWidth: "1050px",
        zIndex: "2",
      }}
    >
      <TextField
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ width: "41vw" }}
      />
      <IconButton onClick={handleOpen}>
        <InsertInvitationIcon color="primary" fontSize="medium" />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ textAlign: "center" }}
          >
            Zoom Meeting Invitation
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date&Time picker"
              value={time}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box sx={{ alignSelf: "flex-end" }}>
            <button className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn" onClick={sendInvitation}>
              Send
            </button>
          </Box>
        </Box>
      </Modal>
      <button
        className="btn"
        style={{ height: "50px", width: "80px" }}
        disabled={text === ""}
        onClick={() => handleSubmit(text)}
      >
        Send
      </button>
    </Box>
  );
};

export default RenderNewMessageForm;
