import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import classes from "./Job.module.scss";

const Search = ({ setFilter, filter, clickhandler }) => {
  const getJobList = (e) => {
    e.preventDefault();
    clickhandler();
  };

  return (
    <form onSubmit={getJobList} className={classes.container}>
      <TextField
        id="keyword_search"
        label="Keyword / Job title"
        value={filter.keyword}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, keyword: e.target.value.trim() }))
        }
        className={classes.keyword}
      />
      <TextField
        id="location_search"
        label="City"
        value={filter.location}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, location: e.target.value.trim() }))
        }
        className={classes.location}
      />
      <div className={classes.filter}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "200px" }}>
          <InputLabel id="On-site/Remote">On-site/Remote</InputLabel>
          <Select
            labelId="On-site/Remote"
            id="select On-site/Remote"
            value={filter.isRemote}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                isRemote: e.target.value.trim(),
              }))
            }
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
            value={filter.isPaid}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, isPaid: e.target.value.trim() }))
            }
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
            value={filter.jobType}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, jobType: e.target.value.trim() }))
            }
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
