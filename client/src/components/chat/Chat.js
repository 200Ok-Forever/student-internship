import {
  Avatar,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {
  ChatEngine,
  ChatEngineContext,
  getOrCreateChat,
  sendMessage,
} from "react-chat-engine";
import "./chat.scss";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

const paper = {
  maxWidth: "500px",
  p: "9px 10px",
  backgroundColor: "#2594F9",
  color: "white",
};

const Chat = () => {
  // TODO: change uername and usersecret
  const student = "John Smith";
  const company = "Google";
  return (
    <Box sx={{ marginTop: "85px" }}>
      <ChatEngine
        projectID="e7fb7381-46fd-413f-9422-766a54881ff6"
        userName={student}
        userSecret="a"
        height="90vh"
        renderNewChatForm={(creds) => <RenderChatForm creds={creds} />}
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
        renderChatSettingsTop={(creds, chat) => (
          <RenderChatSettingsTop creds={creds} chat={chat} />
        )}
        // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
        renderNewMessageForm={(creds, chatID) => (
          <RenderNewMessageForm creds={creds} chatID={chatID} />
        )}
        renderMessageBubble={(
          creds,
          chat,
          lastMessage,
          message,
          nextMessage
        ) => (
          <RenderMessageBubble
            creds={creds}
            chat={chat}
            lastMessage={lastMessage}
            message={message}
            nextMessage={nextMessage}
          />
        )}
      />
    </Box>
  );
};

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

const RenderChatSettingsTop = ({ creds, chat }) => {
  const chatWith = chat?.people[0]?.person;
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
          <Avatar src={chatWith?.avatar}></Avatar>
          <Avatar src={chat?.people[1]?.person?.avatar}></Avatar>
        </Box>
      )}
    </>
  );
};

const RenderNewMessageForm = ({ creds, chatID }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const username = creds?.creds?.userName;
  const handleChange = (newTime) => {
    setTime(newTime);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (text) => {
    sendMessage(creds, chatID, { text });
    setText("");
  };

  const sendInvitation = () => {
    const minutesSeconds = time.toLocaleTimeString();
    const meeting_time =
      time.toLocaleDateString() + " " + minutesSeconds.substr(0, 5);
    const text = `MEETING BOT:😊Hi! ${username} invites you to join zoom meeting on ${meeting_time}`;
    handleSubmit(text);
    handleClose();
  };

  return (
    <Box
      style={{
        position: "absolute",
        bottom: "0px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white",
      }}
    >
      <TextField
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ width: "42vw" }}
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

const RenderMessageBubble = ({ message }) => {
  const sender = message.sender;
  const { activeChat, creds } = useContext(ChatEngineContext);
  const isSentFromCurrUser = sender.username === creds.userName;
  const isInvitation = message.text.includes("MEETING BOT");
  const invitationMsg = message.text.replace("MEETING BOT:", "");
  const isAccepted = message.text.includes("ACCEPT BOT");
  const acceptMsg = message.text.replace("ACCEPT BOT:", "");
  const isRejected = message.text.includes("REJECT BOT");
  const rejectMsg = message.text.replace("REJECT BOT:", "");
  const isLink = message.text.includes("LINK BOT");
  const LinkMsg = message.text.replace("LINK BOT:", "");

  const acceptHandler = async () => {
    // TODO connect api
    sendMessage(creds, activeChat, {
      text: `ACCEPT BOT:${creds.userName} accepted the invitation`,
    });
    sendMessage(creds, activeChat, {
      text:
        "LINK BOT:👉 Join Zoom Meeting on time\n" +
        "https://us04web.zoom.us/j/76094689808?pwd=564gThRd6w4Vaug703-AyBDXe7cx3X.1\n" +
        "Meeting ID: 760 9468 9808\n" +
        "Passcode: TvmG9Y",
    });
  };

  const DeclineHandler = async () => {
    // TODO connect api
    sendMessage(creds, activeChat, {
      text: `REJECT BOT:${creds.userName} rejected the invitation`,
    });
  };

  const InvitationBubble = (
    <Paper
      sx={{
        ...paper,
        background: "white",
        color: "black",
        display: "flex",
        maxWidth: "370px",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Typography variant="body" sx={{ color: "rgb(99, 89, 89)" }}>
        {invitationMsg}
      </Typography>
      <Box>
        <button className="btn" onClick={acceptHandler}>
          Accept
        </button>
        <button className="cancel-btn" onClick={DeclineHandler}>
          Decline
        </button>
      </Box>
    </Paper>
  );

  const Notification = ({ msg }) => (
    <Typography
      variant="subtitle2"
      sx={{
        whiteSpace: "pre-wrap",
      }}
    >
      {msg}
    </Typography>
  );

  const Msg = ({ paperSx }) => {
    if (isInvitation) {
      return InvitationBubble;
    } else if (isAccepted) {
      return <Notification msg={acceptMsg} />;
    } else if (isRejected) {
      return <Notification msg={rejectMsg} />;
    } else if (isLink) {
      return (
        <Paper
          elevation={4}
          sx={{
            ...paper,
            backgroundColor: "white",
            color: "#3d70b2",
            borderRadius: "40px",
            fontWeight: "700",
            px: "20px",
            py: "10px",
            lineHeight: "30px",
          }}
        >
          {LinkMsg}
        </Paper>
      );
    } else {
      return <Paper sx={paperSx}>{message.text}</Paper>;
    }
  };

  return (
    <>
      {isSentFromCurrUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent:
              isAccepted || isRejected || isLink ? "center" : "flex-end",
            margin: "10px 4px",
          }}
        >
          <Msg paperSx={paper} />
          {!isAccepted && !isRejected && !isLink && (
            <Avatar src={sender.avatar} />
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "10px 4px",
            justifyContent: isAccepted || isRejected || isLink ? "center" : "",
          }}
        >
          {!isAccepted && !isRejected && !isLink && (
            <Avatar src={sender.avatar} />
          )}
          <Msg
            paperSx={{ ...paper, backgroundColor: "#EAEAEA", color: "black" }}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
