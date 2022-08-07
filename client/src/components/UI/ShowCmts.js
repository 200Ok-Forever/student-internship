import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AvatarName from "./AvatarName";
import CmtTextField from "./CmtTextField";
import ChatIcon from "@mui/icons-material/Chat";
import TitleWithIcon from "./TitleWithIcon";
import { UserContext } from "../../store/UserContext";

// Can be used for any comments area
// list => comments list {cmdId, text, avatar, username, reply: [{text, avatar, username}]}
// sendCmt => append new content to list of comments and deal with api
// sendReply => append new content to list of replies for a specific comment and deal with api
const box = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const ShowCmts = ({ list, sendCmt, sendReply }) => {
  const { user } = useContext(UserContext);
  return (
    <Box sx={box}>
      <TitleWithIcon
        icon={<ChatIcon size="small" color="primary" />}
        text={`Comments (${list?.length})`}
        mt="50px"
      />
      {user.token && (
        <CmtTextField
          sendHandler={sendCmt}
          isCmt={true}
          placeholder="Any question or thought for this internship?"
        />
      )}
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
  console.log("🚀 ~ cmt", cmt);
  const [openReply, setOpenReply] = useState(false);
  const replies = cmt.replied;
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ ...box }}>
      <AvatarName
        avatar={cmt?.avatar}
        name={cmt.username}
        createdAt={cmt.time}
      />
      <Typography variant="body1" ml="60px">
        {cmt.text}
      </Typography>
      <Box sx={{ width: "95%", mx: "50px" }}>
        {user.token && (
          <Button
            onClick={() => setOpenReply((prev) => !prev)}
            sx={{ mb: "20px" }}
          >
            {openReply ? "Close" : "Reply"}
          </Button>
        )}
        {openReply && (
          <CmtTextField
            sendHandler={sendReply}
            isCmt={false}
            cmtId={cmt.cmtId}
            placeholder=""
          />
        )}

        <Box sx={box}>
          {replies?.map((reply, i) => (
            <Box key={`reply_${i}`} sx={box}>
              <AvatarName
                avatar={reply?.avatar}
                name={reply?.username}
                createdAt={reply.time}
              />
              <Typography
                variant="body1"
                mx="60px"
                sx={{
                  minWidth: "300px",
                  wordBreak: "break-all",
                }}
              >
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
