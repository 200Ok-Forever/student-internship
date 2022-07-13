import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Job.module.scss";
import queryString from "query-string";
import { getJobsListData } from "../../api/search-api";

const Search = ({ setJobList, currPage, setLoad, setCurrPage }) => {
  const { search } = useLocation();
  const info = queryString.parse(search);
  const [keyword, setKeyword] = useState(info.keywords.replace("-", " "));
  const [location, setLocation] = useState(info.location.replace("-", " "));
  const [isRemote, setIsRemote] = useState("");
  const [jobType, setJobType] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [clickSearch, setClickSearch] = useState(false);

  const getData = async () => {
    try {
      console.log(
        `?job=${keyword}&location=${location}&current_page=${currPage}&job_type=${
          jobType === "All" ? "" : jobType
        }&is_remote=${isRemote === "All" ? "" : isRemote}&paid=${
          isPaid === "All" ? "" : isPaid
        }`
      );
      if (clickSearch) {
        setJobList([]);
      }
      const resp = await getJobsListData(
        `?job=${keyword}&location=${location}&current_page=${currPage}&job_type=${
          jobType === "All" ? "" : jobType
        }&is_remote=${isRemote === "All" ? "" : isRemote}&paid=${
          isPaid === "All" ? "" : isPaid
        }`
      );
      if (resp.status === 200) {
        if (resp.data.length === 0) {
          setLoad("End");
        } else {
          setLoad("Loading...");
        }
        if (clickSearch) {
          setJobList(resp.data);
          setClickSearch(false);
        } else {
          setJobList((prev) => prev.concat(resp.data));
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage]);

  const getJobList = (e) => {
    e.preventDefault();
    setCurrPage(1);
    setClickSearch(true);
    getData();
  };

  return (
    <form onSubmit={getJobList} className={classes.container}>
      <TextField
        id="keyword_search"
        label="Keyword / Job title"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.trim())}
        className={classes.keyword}
      />
      <TextField
        id="location_search"
        label="City"
        value={location}
        onChange={(e) => setLocation(e.target.value.trim())}
        className={classes.location}
      />
      <div className={classes.filter}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "200px" }}>
          <InputLabel id="On-site/Remote">On-site/Remote</InputLabel>
          <Select
            labelId="On-site/Remote"
            id="select On-site/Remote"
            value={isRemote}
            onChange={(e) => setIsRemote(e.target.value)}
            label="On-site/Remote"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value="False">On-site</MenuItem>
            <MenuItem value="True">Remote</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "168px" }}>
          <InputLabel id="Paid/Unpaid">Paid/Unpaid</InputLabel>
          <Select
            labelId="Paid/Unpaid"
            id="select Paid/Unpaid"
            value={isPaid}
            onChange={(e) => setIsPaid(e.target.value)}
            label="On-site/Remote"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>

            <MenuItem value="True">Paid</MenuItem>
            <MenuItem value="False">Unpaid</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="job type">Job Type</InputLabel>
          <Select
            labelId="job type"
            id="select job type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            label="Job Type"
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value="FULLTIME">Full-time</MenuItem>
            <MenuItem value="PARTTIME">Part-time</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button className={classes.btn} variant="contained" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
