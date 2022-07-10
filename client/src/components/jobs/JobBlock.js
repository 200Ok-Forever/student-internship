import { Paper } from "@mui/material";
import React from "react";

const JobBlock = ({ job }) => {
  // console.log(job);
  return (
    <Paper
      elevation={3}
      sx={{
        width: "80%",
        minWidth: "430px",
        maxWidth: "1200px",
        height: "200px",
        p: "10px",
      }}
    >
      {job.title}
    </Paper>
  );
};

export default JobBlock;
