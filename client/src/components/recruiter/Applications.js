import React, { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ApplicationSelector from './ApplicationSelector';
import Application from './Application';
import { UserContext } from '../../store/UserContext';
import { getApplicants } from '../../api/company-api';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Applications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [jobTitle, setJobTitle] = useState({})
  const [selectedApp, setSelectedApp] = useState();

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await getApplicants(id, user.token)
        setApplications(res.applicants);
        setLoading(false);
        setJobTitle({
          name: res.intern_title,
          city: res.city
        })
        setSelectedApp(res.applicants.length > 0 && 0)
      } catch (e) {
        window.location.href = '/';
      }
    }
    getApplications();
  }, [id, user.token])
  
  return (
    <Box>
      <Typography variant="h4" component="div">
        Applications
      </Typography>
      {jobTitle.name &&
        <Typography variant="h6" component="div" mt={2} mb={5}>
          {jobTitle.name} {jobTitle.city && `(${jobTitle.city})`}
        </Typography>
      }
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        {loading ?
          <CircularProgress sx={{ alignSelf: 'center' }} />
        : applications.length === 0 ?
          <Typography>No one has applied to this internship yets</Typography>
        : <Grid container spacing={5}>
            <Grid item xs={3.5}>
              <ApplicationSelector 
                applications={applications} 
                setSelectedApp={setSelectedApp} 
                selectedApp={selectedApp}
              />
            </Grid>
            <Grid item xs={8.5}>
              <Application application={applications.length > 0 && applications[selectedApp]} setLoading={setLoading} />
            </Grid>
          </Grid>
        }
      </Box>
    </Box>
  )
}

export default Applications;