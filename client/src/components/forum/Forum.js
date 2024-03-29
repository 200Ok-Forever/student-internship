import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { INDUSTRIES } from "./constants";
import Card from "../UI/Card";

const Forum = () => {
  return (
    <Box>
      <Typography variant="h4" component="div">
        Come for a chat?
      </Typography>
      <Typography variant="body1" component="div" sx={{ mt: 2 }}>
        Discuss internship opportunities and experiences with your peers.
      </Typography>
      <Grid container>
        {INDUSTRIES.map((industry, idx) => (
          <Grid item xs={12} sm={6} lg={4} key={idx}>
            <Card
              title={industry}
              media={`https://source.unsplash.com/random/?${industry}`}
              to={`/forum/${industry.toLowerCase()}`}
              width="85%"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Forum;
