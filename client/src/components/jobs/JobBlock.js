import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import salary from "../../asset/salary.png";
import Label from "../UI/Label";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const JobBlock = ({ job }) => {
  // console.log(job);
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        height: "240px",
        p: "30px",
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          fontFamily="inherit"
          fontWeight="700"
        >
          {job.title}
        </Typography>
        {job?.status === "NEW" && (
          <Typography
            variant="h7"
            gutterBottom
            component="div"
            fontFamily="inherit"
            fontWeight="700"
            color="primary"
          >
            {job.status}
          </Typography>
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "flex-start", columnGap: "10px" }}
      >
        <Avatar
          src={job.company_avatar}
          sx={{ width: 24, height: 24 }}
        ></Avatar>
        <Typography
          variant="h8"
          gutterBottom
          component="div"
          fontFamily="inherit"
          fontWeight="700"
        >
          {job.company_name}
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
      <Box sx={{ display: "flex", columnGap: "14px" }}>
        <Label text={job.min_salary + " - " + job.max_salary}>
          <img src={salary} alt="salary" width="25px" height="25px" />
        </Label>
        <Label text={job.job_type}></Label>
      </Box>
      <Typography
        variant="body1"
        gutterBottom
        component="div"
        fontFamily="inherit"
        sx={{ overflow: "hidden" }}
      >
        {job.description}
      </Typography>
    </Paper>
  );
};

export default JobBlock;
