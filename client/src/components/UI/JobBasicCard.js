import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useHistory } from "react-router-dom";

// job={title, com_name, city, avatar, company id}
const JobBasicCard = (props) => {
  const history = useHistory();
  const job = props.job;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => {
            if (props?.save) return;
            window.open(`/job?id=${job.job_id}`, "_blank");
          }}
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
        <Typography
          variant="h8"
          fontWeight="700"
          sx={{ cursor: "pointer" }}
          onClick={() => history.push(`/company?id=${job.id}`)}
        >
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
