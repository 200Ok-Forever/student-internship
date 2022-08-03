import { Avatar, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { ChatEngineContext, sendMessage } from "react-chat-engine";

const paper = {
  maxWidth: "500px",
  p: "9px 10px",
  backgroundColor: "#2594F9",
  color: "white",
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

export default RenderMessageBubble;
