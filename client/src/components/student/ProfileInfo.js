import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const ProfileInfo = (props) => {
	const data = props.data
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          padding: "36px",
          width: "500px",
          height: "fit-content",
          gap: "25px",
          mx: "auto",
          mb: "35px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" fontFamily="inherit">
          Education
        </Typography>
        <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
          University: {data.university}
        </Typography>
        <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
          Degree: {data.degree}
        </Typography>
        <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
          Major: {data.major}
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          padding: "36px",
          width: "500px",
          height: "fit-content",
          gap: "25px",
          mx: "auto",
          mb: "25px",
        }}
      >
        <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
          Interested Positions: {data.positions}
        </Typography>
        <Typography variant="h6" fontWeight="bold" fontFamily="inherit">
          Skills: {data.skills}
        </Typography>
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontFamily="inherit"
            mb="5px"
          >
            Description:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data.description}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default ProfileInfo;
