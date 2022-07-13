import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import salary from "../../asset/salary.png";
import Label from "../UI/Label";
import JobBasicCard from "../UI/JobBasicCard";

const JobBlock = ({ job, children }) => {
  const paper = {
    width: "auto",
    maxWidth: "1200px",
    height: "265px",
    p: "20px",
    display: "flex",
    flexDirection: "column",
    rowGap: "14px",
  };

  return (
    <Paper elevation={3} sx={paper}>
      <JobBasicCard
        job={{
          title: job.title,
          com_name: job.company_name,
          city: job.city,
          avatar: job.company_avatar,
          id: job.job_id,
        }}
      >
        <Box>
          {job?.status && (
            <Typography
              variant="h7"
              fontWeight="700"
              color={job.status === "NEW" ? "primary" : "rgb(122, 119, 119)"}
            >
              {job.status}
            </Typography>
          )}
          {children}
        </Box>
      </JobBasicCard>
      <Box sx={{ display: "flex", columnGap: "14px" }}>
        {job?.min_salary && (
          <Label text={job.min_salary + " - " + job.max_salary}>
            <img src={salary} alt="salary" width="25px" height="25px" />
          </Label>
        )}
        <Label text={job.job_type}></Label>
        {job.remote && <Label text={"Remote"}></Label>}
      </Box>
      <Typography variant="body1" sx={{ overflow: "hidden" }}>
        {job.description}
      </Typography>
    </Paper>
  );
};

export default JobBlock;
