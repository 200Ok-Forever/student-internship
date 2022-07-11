import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import AvatarName from "./AvatarName";
import CmtTextField from "./CmtTextField";

// Can be used for any comments area
// list => comments list {cmdId, text, avatar, username, reply: [{text, avatar, username}]}
// sendCmt => append new content to list of comments and deal with api
// sendReply => append new content to list of replies for a specific comment and deal with api
const ShowCmts = ({ list, sendCmt, sendReply }) => {
  console.log(list);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <CmtTextField sendHandler={sendCmt} />
      {list?.map((info, i) => (
        <Box key={`intern_cmt_${i}`}>
          <AvatarName avatar={info.avatar} name={info.username} />

          {i + 1 !== list.length && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default ShowCmts;
