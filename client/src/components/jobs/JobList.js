import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import JobBlock from "./JobBlock";
import Search from "./Search";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const center = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "30px",
  };

  const getJobs = (list) => {
    setJobs(list);
  };

  const sortHandler = (e) => {
    // api
    setSortBy(e.target.value);
  };

  return (
    <Box
      sx={{
        ...center,
        mb: "30px",
      }}
    >
      <Search setJobList={getJobs} />
      <Box
        sx={{
          minWidth: "470px",
          width: "100%",
          maxWidth: "1260px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{
            width: "180px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="Sort"
            id="sort list"
            value={sortBy}
            label="Sort By"
            onChange={sortHandler}
          >
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Closing Soon">Closing Soon</MenuItem>
          </Select>
        </FormControl>
        <Typography fontFamily="inherit" variant="body2">
          Showing 3 of 3
        </Typography>
      </Box>
      {jobs.map((job) => (
        <JobBlock job={job} key={job.job_id} />
      ))}
    </Box>
  );
};

export default JobList;
