import React from "react";
import { Box, Typography, Grid } from '@mui/material';
import { INDUSTRIES } from './constants';
import Card from '../UI/Card';

const Forum = () => {
  return (
    <Box>
      <Typography variant="h4" component='div'>
        Come for a chat?
      </Typography>
      <Typography variant="body1" component='div' sx={{ mt: 2 }}>
        Discuss internship opportunities and experiences with your peers.
      </Typography>
      <Grid container>
        {INDUSTRIES.map(industry => (
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              title={industry}
              subheading={`${Math.floor(Math.random() * 1000)} Posts`}
              media='https://picsum.photos/300/200'
              to={`/forum/${industry.toLowerCase()}`}            
              width="85%"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default Forum;
