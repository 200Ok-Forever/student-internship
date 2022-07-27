import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FormControlLabel, Checkbox, Grid, Link, InputLabel, MenuItem, Select, FormControl, Box, Typography, TextField, Button } from '@mui/material';
import { INDUSTRIES } from './constants';

const CreatePost = (props) => {
  const [industry, setIndustry] = useState(props.location.state?.industry || 'General');

  return (
    <Box>
      <Typography variant="h4" component='div' sx={{ mb: 1 }}>
        Create Post
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={8}>
          <TextField id="title" label="Title" fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
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
        </Grid>
      </Grid>
      <TextField
        sx={{ mt: 3 }}
        id="content"
        label="Content"
        multiline
        rows={10}
        placeholder="What are your thoughts?"
        fullWidth
      />
      <FormControlLabel control={<Checkbox />} label="Post Anonymously" sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button color="primary" variant="contained" sx={{ px: 5, mr: 3 }}>
          Post
        </Button>
        <Link underline="none" component={RouterLink} to={`/forum/${props.location.state?.industry || ''}`}>Cancel</Link>
      </Box>
    </Box>
  )
};

export default CreatePost;