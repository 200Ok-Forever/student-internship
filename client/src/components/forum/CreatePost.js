import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, InputLabel, MenuItem, Select, FormControl, Box, Typography, TextField, Button } from '@mui/material';
import { INDUSTRIES } from './constants';

const CreatePost = (props) => {
  const [industry, setIndustry] = useState(props.location.state?.industry || 'General');

  return (
    <Box>
      <Typography variant="h4" component='div' sx={{ mb: 1 }}>
        Create Post
      </Typography>
      <Box sx={{ display: 'flex', mt: 4 }}>
        <TextField id="title" label="Title" fullWidth sx={{ width: '70%' }} />
        <FormControl sx={{ ml: 2, flexGrow: 1 }}>
          <InputLabel id="industry">Industry</InputLabel>
          <Select
            labelId="industry"
            id="industry"
            value={industry}
            label="Industry"
            onChange={e => setIndustry(e.target.value)}
          >
            {INDUSTRIES.map(industry => (
              <MenuItem value={industry}>{industry}</MenuItem>
            ))}
          </Select>
        </FormControl>  
      </Box>    
      <TextField
        sx={{ mt: 3 }}
        id="content"
        label="Content"
        multiline
        rows={10}
        placeholder="What are your thoughts?"
        fullWidth
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Button color="primary" variant="contained" sx={{ px: 5, mr: 3 }}>
          Post
        </Button>
        <Link underline="none" component={RouterLink} to={`/forum/${props.location.state?.industry || ''}`}>Cancel</Link>
      </Box>
    </Box>
  )
};

export default CreatePost;