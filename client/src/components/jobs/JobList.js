import React, { useCallback, useRef, useState } from "react";
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
import Skeletons from "../UI/Skeletons";

const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "30px",
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  console.log("🚀 ~ jobs", jobs);
  const [sortBy, setSortBy] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [load, setLoad] = useState("");

  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

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
      <Search
        setJobList={getJobs}
        currPage={currPage}
        setLoad={setLoad}
        setCurrPage={setCurrPage}
      />
      <Box
        sx={{
          minWidth: "450px",
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
        {jobs.length !== 0 && (
          <Typography fontFamily="inherit" variant="h7">
            Showing {jobs.length} of {jobs[0].numAllResults.total_count}
          </Typography>
        )}
      </Box>
      {jobs.length !== 0 ? (
        jobs.map((job) => <JobBlock job={job} key={job.job_id} />)
      ) : (
        <Skeletons />
      )}
      {jobs.length !== 0 && (
        <Box ref={lastItemRef}>
          <p>{load}</p>
        </Box>
      )}
    </Box>
  );
};

export default JobList;
