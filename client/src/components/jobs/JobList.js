import React, { useState } from "react";
import JobBlock from "./JobBlock";
import Search from "./Search";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = (list) => {
    setJobs(list);
  };

  return (
    <>
      <Search setJobList={getJobs} />
      {jobs.map((job) => (
        <JobBlock job={job} key={job.job_id} />
      ))}
    </>
  );
};

export default JobList;
