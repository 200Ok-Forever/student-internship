import React from 'react';
import { useLocation } from 'react-router-dom'
import { Typography, Box } from '@mui/material';

const IndustryForum = () => {
  const location = useLocation();
  const industry = location.pathname.split('/')[location.pathname.split('/').length-1]
  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant="h4" component='div'>
        {industry}
      </Typography>
    </Box>
  )
}

export default IndustryForum;