import { Avatar, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { ChatEngineContext, sendMessage } from "react-chat-engine";
import { createMeeting } from "../../api/chat-api";
import { UserContext } from "../../store/UserContext";

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
  const { user } = useContext(UserContext);

  const acceptHandler = async (msg, otherId) => {
    console.log("🚀 ~ otherId", otherId);
    if (otherId === user.uid.toString()) return;
    // TODO connect api
    sendMessage(creds, activeChat, {
      text: `ACCEPT BOT:${user.username} accepted the invitation`,
    });

    const data = {
      otherUserId: otherId,
      time: msg.split(" ").pop(),
    };
    try {
      const rep = await createMeeting(data, user.token);
      if (rep.status === 200) {
        sendMessage(creds, activeChat, {
          text:
            `LINK BOT:👉 Join Zoom Meeting on time(${msg.split(" ").pop()})\n` +
            `${rep.data.join_url}\n`,
        });
      }
    } catch ({ response }) {
      console.log(response);
      sendMessage(creds, activeChat, {
        text: "Internal server error",
      });
    }
  };

  const DeclineHandler = async (otherId) => {
    if (otherId === user.uid.toString()) return;
    sendMessage(creds, activeChat, {
      text: `REJECT BOT:${user.username} rejected the invitation`,
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
        <button
          className="btn"
          onClick={() => acceptHandler(invitationMsg, sender.username)}
        >
          Accept
        </button>
        <button
          className="cancel-btn"
          onClick={() => DeclineHandler(sender.username)}
        >
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
            <Avatar src={sender.last_name} />
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
            <Avatar src={sender.last_name} />
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
