import React, { useState } from "react";
import { Box } from '@mui/material';
import JobBlock from "./JobBlock";
import Search from "./Search";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = (list) => {
    setJobs(list);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Search setJobList={getJobs} />
      {jobs.map((job) => (
        <JobBlock job={job} key={job.job_id} />
      ))}
    </Box>
  );
};

export default JobList;
