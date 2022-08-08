import { Paper, Typography, Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useContext, useState } from "react";
import TitleWithIcon from "../UI/TitleWithIcon";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import JobBasicCard from "../UI/JobBasicCard";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ProfileInfo from "./ProfileInfo";
import { useHistory } from "react-router-dom";
import { getLongUserInfo } from "../../api/auth-api";
import { UserContext } from "../../store/UserContext";

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

const Profile = () => {
  const { user } = useContext(UserContext);

  // get user's infomations
  const [info, setInfo] = useState({});
  useEffect(() => {
    const loadInfo = async () => {
      const res = await getLongUserInfo(user.uid);
      res.skills = res.skills.toString();
      setInfo(res);
    };
    loadInfo();
  }, [user.uid]);

  const history = useHistory();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "35px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, width: "60px", height: "60px" }} />
        <Typography variant="h4" fontWeight="bold" fontFamily="inherit">
          {info.first_name} {info.last_name}
        </Typography>
      </Box>
      <Box sx={{ width: "50vw" }}>
        <Button
          variant="outlined"
          sx={{ alignSelf: "flex-start" }}
          onClick={() => {
            history.push("/editstudentprofile");
          }}
        >
          Edit Profile
        </Button>
      </Box>
      <ProfileInfo data={info} />
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
        width: "50vw",
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
