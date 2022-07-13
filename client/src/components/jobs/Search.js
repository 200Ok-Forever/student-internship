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
import classes from "./Job.module.scss";
import queryString from "query-string";
import { getJobsListData } from "../../api/search-api";

const DUMMY_DATA = [
  {
    job_id: "aa",
    company_id: "1",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
    city: "Sydney",
    closed_date: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    remote: true,
    job_type: "Full-time",
    status: "NEW",
  },
  {
    job_id: "aa3",
    company_id: "2",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    status: "Seen",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    job_type: "Full-time",
    remote: false,
  },
  {
    job_id: "aa1",
    company_id: "3",
    title: "Software engineer intern",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    city: "Sydney",
    expiration_timestamp: "01/03/2023",
    min_salary: "$12",
    max_salary: "$40",
    salary_currency: "Au",
    company_name: "Google",
    company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
    job_type: "Full-time",
    remote: true,
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
    const getDate = async () => {
      const resp = await getJobsListData(
        `?job=${keyword}&location=${location}`
      );
      console.log(resp);
    };

    try {
      getDate();
    } catch (e) {
      console.log(e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobList = (e) => {
    e.preventDefault();
    setJobList(DUMMY_DATA2);
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
