import { Avatar, Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./company.module.scss";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WorkIcon from "@mui/icons-material/Work";
const data = {
  company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
  description:
    "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
  company_name: "Google",
  company_url: "www.google.com",
  industry: "Technology",
  linkedIn: "https://www.linkedin.com/company/google/?originalSubdomain=au",
  company_size: "10000+",
  founded_year: "2000",
};

const Company = () => {
  const [info, setInfo] = useState([]);
  const [isOverview, setIsOverview] = useState(true);

  useEffect(() => {
    setInfo(data);
  }, []);

  return (
    <>
      <div className={classes.head}>
        <Avatar
          src={data.company_avatar}
          sx={{ width: "70px", height: "70px", mt: "60px" }}
        />
        <Typography variant="h3" color={"secondary"} mt="60px">
          {data.company_name}
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
          gap: "60px",
        }}
      >
        {isOverview ? <Overview info={info} /> : <Jobs />}
      </Box>
    </>
  );
};

const Overview = ({ info }) => {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          width: "70%",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          padding: "30px",
        }}
      >
        <Typography>
          <b>Company URL: </b> <a href={info.company_url}>{info.company_url}</a>
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
          {info.industry}
        </Typography>
        <Typography sx={{ wordBreak: "break-all" }}>
          <b>LinkedIn: </b>
          <a href={info.linkedIn}>{info.linkedIn}</a>
        </Typography>
      </Paper>
      <Typography variant="body1" sx={{ width: "80%" }}>
        {info.description}
      </Typography>
    </>
  );
};

const Jobs = () => {
  return <>jobs</>;
};

export default Company;
