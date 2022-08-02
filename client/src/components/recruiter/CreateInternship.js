import React, { useEffect, useState } from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Link, IconButton, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, TextField, Box, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import { CURRENCY_CODES } from './constants';

const CreateInternship = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(id ? true : false);

  const [title, setTitle] = useState("");
  const [closeDate, setCloseDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [paid, setPaid] = useState(true);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [remote, setRemote] = useState(false);
  const [type, setType] = useState("full time");
  const [steps, setSteps] = useState([""]);
  const [questions, setQuestions] = useState(['']);
  const [resume, setResume] = useState(true);
  const [coverLetter, setCoverLetter] = useState(false);

  useEffect(() => {
    if (id) {
      // TODO get internship info
      // TODO check this company owns the job
      const job = {
        title: 'test',
        closeDate: new Date(),
        location: 'Sydney',
        currency: 'AUD',
        minSalary: '50000',
        maxSalary: '60000',
        remote: true,
        type: 'full time',
        steps: ['Step 1', 'Step 2'],
        questions: ['How are you?'],
        resume: true,
        coverLetter: true,
      }
      setTitle(job.title);
      setCloseDate(job.closeDate);
      setLocation(job.location);
      setCurrency(job.currency);
      setMinSalary(job.minSalary);
      setMaxSalary(job.maxSalary);
      setRemote(job.remote);
      setType(job.type);
      setSteps(job.steps);
      setQuestions(job.questions);
      setResume(job.resume);
      setCoverLetter(job.coverLetter);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (!paid) {
      setMinSalary(0);
      setMaxSalary(0);
    }
  }, [paid])

  if (loading) {
    return;
  }

  return (
    <Box>
      <Typography variant="h4" component='div' sx={{ mb: 1 }}>
        {id ? "Edit" : "Post"} an Internship
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} mt={4}>
        <Typography variant="h5" component='div'>
          General Details
        </Typography>
        <TextField id="title" label="Position Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} />
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
          <TextField id="location" label="Location" variant="outlined" value={location} onChange={e => setLocation(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel 
            control={<Checkbox checked={paid} onChange={e => setPaid(e.target.checked)} />} 
            label="Paid Role" 
          />
          <FormControl>
            <InputLabel id="currency">Salary Currency</InputLabel>
            <Select
              labelId="currency"
              disabled={!paid}
              id="currency"
              value={currency}
              label="Salary Currency"
              onChange={e => setCurrency(e.target.value)}
            >
              {CURRENCY_CODES.map(c => (
                <MenuItem value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl> 
          <CurrencyTextField
            label="Min Salary"
            variant="outlined"
            value={minSalary}
            currencySymbol="$"
            minimumValue="0"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            disabled={!paid}
            onChange={(event, value) => setMinSalary(value)}
          />
          <CurrencyTextField
            label="Max Salary"
            variant="outlined"
            value={maxSalary}
            currencySymbol="$"
            minimumValue="0"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            disabled={!paid}
            onChange={(event, value) => setMaxSalary(value)}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <FormControlLabel 
            control={<Checkbox checked={remote} onChange={e => setRemote(e.target.checked)} />} 
            label="Remote Role"
          />
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
            <FormControlLabel 
              control={<Checkbox checked={resume} onChange={e => setResume(e.target.checked)} />} 
              label="Resume Required"
            />
            <FormControlLabel 
              control={<Checkbox checked={coverLetter} onChange={e => setCoverLetter(e.target.value)} />} 
              label="Cover Letter Required" 
            />
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
          <Typography variant="subtitle1" sx={{ width: '30px'}}>
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