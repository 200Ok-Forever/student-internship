import moment from 'moment';
import { Status } from './ApplicationSelector';
import { Link, Button, Avatar, Grid, Box, Typography } from '@mui/material';

const user = {
  university: 'University of New South Wales',
  degree: "Bachelor's in Computer Science",
  major: 'Artificial Inteligence'
}

const Application = ({ application }) => {
  return (
    <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
      <ApplicationHeader application={application} />
      <Documents application={application} />
      <Questions questions={application.questions} />
    </Box>
  )
}

const ApplicationHeader = ({ application }) => {
  const pending = application.status != 'accepted' && application.status != 'rejected';
  return (
    <Box>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={application.avatar} sx={{ height: 150, width: 150, mr: 5 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4">
              {application.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Status status={application.status} />
              {pending && <>
                <Button size="large" variant='contained' color='success'>Proceed</Button>
                <Button size="large" variant={application.shortlist ? 'outlined' : 'contained'} color='warning'>
                  {application.shortlist ? 'Unshortlist' : 'Shortlist'}
                </Button>
                <Button size="large" variant='contained' color='error'>Reject</Button>        
              </>}
            </Box>
          </Box>
          <Typography variant="caption">
            Applied {moment(application.appliedAt).fromNow()}
          </Typography>
          <Typography variant="subtitle1">
            {user.university}
          </Typography>
          <Typography variant="subtitle1" mb={2}>
            {user.degree} ({user.major})
          </Typography>
          <Box>
            <Button size="large" variant='outlined' color='primary'>View Profile</Button>
            <Button size="large" variant='outlined' color='primary' sx={{ ml: 2 }}>Message</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const Documents = ({ application }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">
        Documents
      </Typography>
      <Grid container mt={3}>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={1}>
            Resume
          </Typography>
          <Link href={application.resume}>my_resume.pdf</Link>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} mb={1}>
            Cover Letter
          </Typography>
          {application.coverLetter ? (
            <Link href={application.coverLetter}>my_letter.pdf)</Link>
          ) : (
            <Typography variant="body1">
              None Submitted
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

const Questions = ({ questions }) => {
  return (
    <Box mt={4}>
      <Typography variant='h5'>
        Application Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3}}>
        {questions.map(question => (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
              {question.question}
            </Typography>
            <Typography variant="body1">
              {question.answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Application;