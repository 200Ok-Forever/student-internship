import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import AvatarName from "./AvatarName";
import CmtTextField from "./CmtTextField";

// Can be used for any comments area
// list => comments list {cmdId, text, avatar, username, reply: [{text, avatar, username}]}
// sendCmt => append new content to list of comments and deal with api
// sendReply => append new content to list of replies for a specific comment and deal with api

const box = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const ShowCmts = ({ list, setComments }) => {
  const sendCmt = (newCmt) => {
    setComments((prev) => [newCmt].concat(prev));
  };

  const sendReply = (cmtId, newReply) => {
    const copy = list;
    const comment = copy.find((e) => e.cmtId === cmtId);
    console.log(comment);
    if (comment) {
      comment.reply = [newReply].concat(comment.reply);
    }
    setComments(copy);
  };

  return (
    <Box sx={box}>
      <CmtTextField sendHandler={sendCmt} isCmt={true} />
      {list?.map((comment, i) => (
        <Item
          key={`intern_cmt_${i}`}
          cmt={comment}
          isLast={i + 1 === list.length}
          sendReply={sendReply}
        />
      ))}
    </Box>
  );
};

const Item = ({ cmt, isLast, sendReply }) => {
  const [openReply, setOpenReply] = useState(false);
  const replies = cmt.reply;

  return (
    <Box sx={{ ...box }}>
      <AvatarName avatar={cmt.avatar} name={cmt.username} />
      <Typography variant="body1" fontFamily="inherit" ml="60px">
        {cmt.text}
      </Typography>
      <Box sx={{ width: "95%", ml: "50px" }}>
        <Button
          onClick={() => setOpenReply((prev) => !prev)}
          sx={{ mb: "20px" }}
        >
          {openReply ? "Close" : "Reply"}
        </Button>
        {openReply && (
          <CmtTextField
            sendHandler={sendReply}
            isCmt={false}
            cmtId={cmt.cmtId}
          />
        )}
        <Box ml="8px">
          {replies?.map((reply, i) => (
            <Box key={`reply_${i}`} sx={box}>
              <AvatarName avatar={reply.avatar} name={reply.username} />
              <Typography variant="body1" fontFamily="inherit" ml="60px">
                {reply.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {!isLast && <Divider />}
    </Box>
  );
};

export default ShowCmts;
