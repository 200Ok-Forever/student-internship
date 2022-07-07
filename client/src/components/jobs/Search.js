import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./style/search.module.scss";
import queryString from "query-string";

const DUMMY_DATA = [
  {
    job_id: "aa",
    company_id: "1",
    title: "Software engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "",
  },
];

const DUMMY_DATA2 = [
  {
    job_id: "aa",
    company_id: "1",
    title: "Frontend engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "",
  },
];

const Search = ({ setJobList }) => {
  const { search } = useLocation();
  const info = queryString.parse(search);
  const [keyword, setKeyword] = useState(info.keywords.replace("-", " "));
  const [location, setLocation] = useState(info.location.replace("-", " "));
  const [isRemote, setIsRemote] = useState(false);
  const [jobType, setJobType] = useState("All");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setJobList(DUMMY_DATA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobList = (e) => {
    e.preventDefault();
    setJobList(DUMMY_DATA2);
  };

  return (
    <form onSubmit={getJobList} className={classes.container}>
      <TextField
        id="outlined-name"
        label="Keyword / Job title"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className={classes.keyword}
      />
      <TextField
        id="outlined-name"
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className={classes.location}
      />
      <div className={classes.filter}>
        <FormControlLabel
          value="Remote"
          control={
            <Checkbox
              checked={isRemote}
              onChange={() => setIsRemote((prev) => !prev)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Remote"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Paid"
          control={
            <Checkbox
              checked={isPaid}
              onChange={() => setIsPaid((prev) => !prev)}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Paid"
          labelPlacement="end"
        />
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
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
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
