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
          <Grid item xs={3}>
            <Card
              title={industry}
              subheading="1042 posts"
              media='https://picsum.photos/300/200'
              to={`/forum/${industry}`}            
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default Forum;
