import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import classes from "./company.module.scss";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkIcon from "@mui/icons-material/Work";
import JobBlock from "../jobs/JobBlock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { getCompanyInfo } from "../../api/company-api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../store/UserContext";
import { companyGetJobInfo } from "../../api/company-api";

const Company = () => {
  const [info, setInfo] = useState([]);
  console.log("🚀 ~ info", info);
  const [isOverview, setIsOverview] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("id");
      const res = await getCompanyInfo(id);
      setInfo(res);
    };
    getData();
  }, []);
  return (
    <>
      <div className={classes.head}>
        <Avatar
          src={info.company_logo}
          sx={{ width: "70px", height: "70px", mt: "60px" }}
        />
        <Typography variant="h3" color={"secondary"} mt="60px">
          {info.company_name}
        </Typography>
      </div>
      <div className={classes.nav}>
        <button
          onClick={() => setIsOverview((prev) => !prev)}
          className={isOverview ? classes.active : ""}
        >
          <MenuBookIcon />
          <h4>Overview</h4>
        </button>
        <button
          onClick={() => setIsOverview((prev) => !prev)}
          className={!isOverview ? classes.active : ""}
        >
          <WorkIcon />
          <h4>Jobs</h4>
        </button>
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          my: "50px",
          gap: "25px",
          minHeight: "80vh",
        }}
      >
        {isOverview ? <Overview info={info} /> : <Jobs />}
      </Box>
    </>
  );
};

const Overview = ({ info }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  return (
    <>
      {user.role === 2 && (
        <Button
          variant="outlined"
          onClick={() => {
            history.push("/editcompanyprofile");
          }}
        >
          Edit Profile
        </Button>
      )}
      <Paper
        elevation={4}
        sx={{
          width: "70%",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          padding: "30px",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography>
            <b>Company URL: </b>{" "}
            <a href={info.company_url}>{info.company_url}</a>
          </Typography>
          <Typography>
            <b>Founded Year: </b>
            {info.founded_year}
          </Typography>
          <Typography>
            <b>Company Size: </b>
            {info.company_size}
          </Typography>
          <Typography>
            <b>Industry: </b>
            {info.industries?.map((i) => i.name)}
          </Typography>
          <Typography sx={{ wordBreak: "break-all" }}>
            <b>LinkedIn: </b>
            <a href={info.linkedin}>{info.linkedin}</a>
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<MailOutlineIcon />}
          size="small"
          onClick={() => {
            window.open(`/chat`, "_blank");
            localStorage.setItem("chat", info.id.toString());
          }}
        >
          Chat
        </Button>
      </Paper>
      <Typography variant="body1" sx={{ width: "80%", mt: "30px" }}>
        {info.description}
      </Typography>
    </>
  );
};

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);

  const getJobs = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const res = await companyGetJobInfo(id, "", "", "");
    const jobs = res.jobs.map((i) => ({
      ...i,
      company_logo: res.company_logo,
      company_name: res.company_name,
      location: i.city,
      job_id: i.id,
    }));
    setJobsList(jobs);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      {jobsList?.map((job, i) => (
        <JobBlock job={job} key={`job_${i}`} />
      ))}
    </>
  );
};

export default Company;
