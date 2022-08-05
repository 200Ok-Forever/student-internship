import { Typography, Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const StudentProfile = () => {
  const infoData = {
    first_name: "Leon",
    last_name: "Wu",
    university: "UNSW",
    degree: "Bachelor of Computer Science",
    positions: "Software Engineer, IT consultant",
    major: "AI",
    skills: "Java,C",
    description:
      "Hello! asdkljfaskldjfaskldjfaskldjfa klsdfjaskldfjaskldjfalskdfjasklfklasdjfklasf",
  };

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
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
      <Typography variant="h4" fontWeight="bold" fontFamily="inherit">
        {infoData.first_name} {infoData.last_name}
        <Button size="small">
          <ChatOutlinedIcon />
        </Button>
      </Typography>
      <ProfileInfo data={infoData} />
    </Box>
  );
};

export default StudentProfile;
