import { Paper, Typography, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TitleWithIcon from "../UI/TitleWithIcon";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import JobBasicCard from "../UI/JobBasicCard";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProfileInfo from "./ProfileInfo";
const data = [
  {
    title: "Software Engineer Intern",
    com_name: "Google",
    avatar: "https://img.icons8.com/officel/344/google-logo.png",
    city: "Sydney",
    company_id: "1",
    job_id: "1",
    status: "Pending",
    appliedDate: "11/06/2022",
  },
  {
    title: "Software Engineer Intern",
    com_name: "Apple",
    avatar: "https://img.icons8.com/ios-filled/344/mac-os.png",
    city: "Sydney",
    company_id: "1",
    job_id: "2",
    status: "Rejected",
    appliedDate: "11/06/2022",
  },
  {
    title: "Software Engineer Intern",
    com_name: "Microsoft",
    avatar: "https://img.icons8.com/color/344/microsoft.png",
    city: "Sydney",
    company_id: "1",
    job_id: "3",
    status: "Accepted",
    appliedDate: "11/06/2022",
  },
];

const infoData = {
  first_name: "Leon",
  last_name: "Wu",
  university: "UNSW",
  degree: "Bachelor of Computer Science",
  positions: "Software Engineer, IT consultant",
  major: "AI",
  skills: "Java,C",
  description:
    "Hello! asdkljfaskldjfaskldjfaskldjfaklsdfjaskldfjaskldjfalskdfjasklfklasdjfklasf",
};

const Profile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "35px"
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
      <Typography variant="h4" fontWeight="bold" fontFamily="inherit">
        {infoData.first_name} {infoData.last_name}
      </Typography>
      <ProfileInfo data={infoData}/>
      <TitleWithIcon
        sx={{}}
        icon={<WorkHistoryIcon color="primary" />}
        text="Applied Internships"
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
        mt="20px"
      >
        {data.map((job, i) => (
          <AppliedJob job={job} key={i} />
        ))}
      </Box>
    </Box>
  );
};

const AppliedJob = ({ job }) => {
  console.log("🚀 ~ job", job);
  const color = () => {
    switch (job.status) {
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "#3d70b2";
    }
  };
  return (
    <Paper
      sx={{
        width: "550px",
        p: "20px 20px",
      }}
    >
      <JobBasicCard
        job={{
          title: job.title,
          com_name: job.com_name,
          city: job.city,
          avatar: job.avatar,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: color() }}>
          {job.status === "Pending" ? (
            <AccessTimeIcon />
          ) : job.status === "Rejected" ? (
            <CloseIcon />
          ) : (
            <CheckIcon />
          )}
          <Typography>{job.status}</Typography>
        </Box>
      </JobBasicCard>
      <Typography variant="subtitle2" pt="10px">
        <i>Applied Date: {job.appliedDate}</i>
      </Typography>
    </Paper>
  );
};

export default Profile;
