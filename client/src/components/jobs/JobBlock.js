import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import salary from "../../asset/salary.png";
import Label from "../UI/Label";
import JobBasicCard from "../UI/JobBasicCard";
import getSymbolFromCurrency from "currency-symbol-map";

const paper = {
  width: "1200px",
  maxWidth: "1200px",
  height: "265px",
  p: "20px",
  display: "flex",
  flexDirection: "column",
  rowGap: "14px",
};

const JobBlock = ({ job, children }) => {
  const date = new Date().toJSON().slice(0, 10);
  const status =
    job.is_seen === "False" && date === job.posted_time
      ? "NEW"
      : job.is_seen === "True" && "SEEN";
  let salary_str;
  let salary_curr =
    job.salary_currency !== "AUD"
      ? getSymbolFromCurrency(job.salary_currency)
      : "AU$";
  salary_curr = salary_curr || "$";
  if (job.min_salary && job.max_salary) {
    salary_str =
      salary_curr + job.min_salary + " - " + salary_curr + job.max_salary;
  } else {
    salary_str = salary_curr + job.min_salary || salary_curr + job.max_salary;
  }

  return (
    <Paper elevation={3} sx={paper}>
      <JobBasicCard
        job={{
          title: job.title,
          com_name: job.company_name,
          city: job.location,
          avatar: job.company_logo,
          job_id: job.job_id,
          company_id: job.company_id
        }}
      >
        <Box>
          {status.length !== 0 && (
            <Typography
              variant="h7"
              fontWeight="700"
              color={status === "NEW" ? "primary" : "rgb(122, 119, 119)"}
            >
              {status}
            </Typography>
          )}
          {children}
        </Box>
      </JobBasicCard>
      <Box sx={{ display: "flex", columnGap: "14px" }}>
        {(job.min_salary || job.max_salary) && (
          <Label text={salary_str}>
            <img src={salary} alt="salary" width="25px" height="25px" />
          </Label>
        )}
        {job.type && <Label text={job.type}></Label>}
        {job.is_remote === "TRUE" ? (
          <Label text={"Remote"} />
        ) : (
          <>{job.is_remote === "FALSE" && <Label text={"On-site"} />}</>
        )}
      </Box>
      <Typography variant="body1" sx={{ overflow: "hidden" }}>
        {job.description}
      </Typography>
    </Paper>
  );
};

export default JobBlock;
