import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, IconButton, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, TextField, Box, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateInternship = () => {
  const [closeDate, setCloseDate] = useState(new Date());
  const [type, setType] = useState("full time");
  const [questions, setQuestions] = useState(['']);
  const [steps, setSteps] = useState([""]);

  return (
    <Box>
      <Typography variant="h4" component='div' sx={{ mb: 1 }}>
        Post an Internship
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} mt={4}>
        <Typography variant="h5" component='div'>
          General Details
        </Typography>
        <TextField id="title" label="Position Title" variant="outlined" />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="Application Close Date"
              inputFormat="DD/MM/yyyy"
              value={closeDate}
              onChange={setCloseDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField id="location" label="Location" variant="outlined" />
          <TextField type="number" id="salary_currency" label="Salary Currency" variant="outlined" />
          <TextField type="number" id="salary_min" label="Min Salary" variant="outlined" />
          <TextField type="number" id="salary_max" label="Max Salary" variant="outlined" />
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FormControlLabel control={<Checkbox />} label="Remote Role" />
          <FormControl>
            <InputLabel id="type">Job Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              label="Job Type"
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value='full time'>Full Time</MenuItem>
              <MenuItem value='part time'>Part Time</MenuItem>
            </Select>
          </FormControl>   
        </Box>
        <Box>
          <Typography variant="h5" component='div' sx={{ mb: 1 }}>
            Recruitment Process
          </Typography>
          <List values={steps} setValues={setSteps} placeholder="e.g. phone interview, technical interview etc" />        
        </Box>
        <Box>
          <Typography variant="h5" component='div' sx={{ mb: 1 }}>
            Applicaiton Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel control={<Checkbox />} label="Resume Required" />
            <FormControlLabel control={<Checkbox />} label="Cover Letter Required" />
          </Box>
          <Typography variant="h6" component='div' sx={{ mb: 1 }}>
            Questions
          </Typography>
          <List setValues={setQuestions} values={questions} placeholder="E.g. why are you interested in this role?" />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }} mt={4} >
        <Button color="primary" variant="contained" sx={{ px: 5, mr: 3 }}>
          Post
        </Button>
        <Link underline="none" component={RouterLink} to='/'>Cancel</Link>
      </Box>
    </Box>
  )
}

const List = ({ values, setValues, placeholder }) => {
  const onTextChange = (val, i) => {
    let newValues = [...values]
    newValues[i] = val;
    setValues(newValues)
  }

  const onDelete = (i) => {
    let newValues = [...values];
    newValues.splice(i, 1);
    setValues(newValues);
  }

  const onAdd = () => {
    let newValues = [...values];
    newValues.push('');
    setValues(newValues);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} mt={3}>
      {values.map((v, i) => (
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {i+1}
          </Typography>
          <TextField 
            sx={{ flexGrow: 1 }} 
            placeholder={placeholder} 
            variant="outlined" value={v} 
            onChange={e => onTextChange(e.target.value, i)} 
          />
          <IconButton color="error" onClick={() => onDelete(i)} disabled={values.length === 1}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button sx={{ alignSelf: 'flex-start' }} onClick={onAdd} color="primary" variant="outlined" size="large">Add</Button>
    </Box>
  )
}

export default CreateInternship;