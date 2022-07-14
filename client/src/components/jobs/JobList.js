import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { getJobsListData } from "../../api/search-api";

const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: "30px",
};

const JobList = () => {
  const { search } = useLocation();
  const info = queryString.parse(search);
  const [jobs, setJobs] = useState([]);
  console.log("🚀 ~ jobs", jobs);
  const [sortBy, setSortBy] = useState("Default");
  const [currPage, setCurrPage] = useState(1);
  const [load, setLoad] = useState("Loading...");
  const [filter, setFilter] = useState({
    keyword: info.keywords.replace("-", " "),
    location: info.location.replace("-", " "),
    isRemote: "",
    jobType: "",
    isPaid: "",
  });
  const [clickSearch, setClickSearch] = useState(false);
  const [cannotReload, setCannotReload] = useState(false);
  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const getData = async () => {
    try {
      if (clickSearch) {
        setJobs([]);
        setLoad("Loading...");
      }
      console.log(
        `?job=${filter.keyword}&location=${
          filter.location
        }&current_page=${currPage}&job_type=${
          filter.jobType === "All" ? "" : filter.jobType
        }&is_remote=${filter.isRemote === "All" ? "" : filter.isRemote}&paid=${
          filter.isPaid === "All" ? "" : filter.isPaid
        }&sort=${sortBy}`
      );
      const resp = await getJobsListData(
        `?job=${filter.keyword}&location=${
          filter.location
        }&current_page=${currPage}&job_type=${
          filter.jobType === "All" ? "" : filter.jobType
        }&is_remote=${filter.isRemote === "All" ? "" : filter.isRemote}&paid=${
          filter.isPaid === "All" ? "" : filter.isPaid
        }&sort=${sortBy}`
      );
      if (resp.status === 200) {
        if (resp.data.length === 0) {
          setLoad("End");
        }
        if (clickSearch) {
          setCannotReload(true);
          setJobs(resp.data);
          setClickSearch(false);
        } else {
          setJobs((prev) => prev.concat(resp.data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!cannotReload) {
      getData();
    } else {
      setCannotReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, clickSearch]);

  const sortHandler = (e) => {
    setCurrPage(1);
    setSortBy(e.target.value);
    setClickSearch((prev) => !prev);
  };

  const clickhandler = () => {
    setCurrPage(1);
    setClickSearch((prev) => !prev);
  };

  return (
    <Box
      sx={{
        ...center,
        mb: "30px",
      }}
    >
      <Search
        setFilter={setFilter}
        filter={filter}
        clickhandler={clickhandler}
      />
      <Box
        sx={{
          minWidth: "450px",
          width: "100%",
          maxWidth: "1230px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl
          sx={{
            width: "190px",
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
            <MenuItem value="Default">
              <em>Default</em>
            </MenuItem>
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
        <>
          {load !== "End" ? <Skeletons /> : <Typography>No result</Typography>}
        </>
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
