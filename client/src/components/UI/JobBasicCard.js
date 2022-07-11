import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

// job={title, com_name, city, avatar}
const JobBasicCard = (props) => {
  const job = props.job;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={props?.onClick}
        >
          {job.title}
          {props?.save}
        </Typography>
        {/* add calendar, save buttons or labels */}
        {props.children}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "flex-start", columnGap: "10px" }}
      >
        <Avatar src={job.avatar} sx={{ width: 24, height: 24 }}></Avatar>
        <Typography variant="h8" fontWeight="700">
          {job.com_name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            columnGap: "3px",
            ml: "10px",
          }}
        >
          <FmdGoodIcon fontSize="small" color="primary" />
          {job.city}
        </Box>
      </Box>
    </>
  );
};

export default JobBasicCard;
