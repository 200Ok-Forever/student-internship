import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import JobBlock from "./JobBlock";
import Search from "./Search";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [currPage, setCurrPage] = useState(0);

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
          minWidth: "450px",
          width: "100%",
          maxWidth: "1260px",
        }}
      >
        <FormControl
          sx={{
            width: "180px",
          }}
        >
          <InputLabel id="sort-by">Sort By</InputLabel>
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
      </Box>
      {jobs.map((job) => (
        <JobBlock job={job} key={job.job_id} />
      ))}
    </Box>
  );
};

export default JobList;
