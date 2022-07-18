import React, { useState } from 'react';
import moment from 'moment';
import { Link, Button, List, ListItem, ListItemButton, Avatar, Grid, Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const applications = [
  {
    applicationId: 1,
    appliedAt: new Date(),
    userId: 2,
    name: 'James Joseph',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'pending',
    email: 'james@james.com',
    resume: 'www.google.com',
    coverLetter: 'www.google.com',
    questions: [
      {
        question: 'Why do you want this job?',
        answer: 'Veniam nulla ad deserunt enim adipisicing ipsum excepteur et dolore sunt. Incididunt anim ea proident ullamco proident fugiat proident labore. Qui deserunt fugiat aute ex ut sunt deserunt id elit veniam proident. Amet nulla nostrud quis incididunt dolore.'
      },
      {
        question: 'Why would you fit this role?',
        answer: 'Ea pariatur dolore id labore nulla. Aliqua dolor anim pariatur sit irure qui ut. Commodo anim exercitation magna eiusmod officia amet reprehenderit. Magna velit fugiat proident cupidatat exercitation veniam enim commodo laboris eiusmod ea do nostrud labore. Aliqua est irure nisi ut. Deserunt consequat aute irure sit sit qui magna aliquip exercitation. Non ea excepteur eiusmod aliqua in cillum reprehenderit est sint consectetur aliqua elit excepteur. Aliquip eu nisi non labore. Anim qui duis excepteur nisi Lorem. Aute aute cupidatat quis voluptate ea eiusmod minim minim eiusmod aute. Tempor adipisicing enim consectetur labore adipisicing proident ea do esse. Et duis eiusmod dolore pariatur velit nisi minim officia. Incididunt Lorem reprehenderit ea voluptate ex cillum eiusmod reprehenderit consectetur. Sit quis qui eiusmod aute labore do eu nostrud aute in culpa. Elit sit in tempor aliqua excepteur nulla irure et in aute ut. Non quis anim aute exercitation do eiusmod. In nisi voluptate ad aute cillum excepteur Lorem. Dolore excepteur dolore ut anim esse laborum aliqua irure quis. Anim voluptate mollit quis irure nostrud Deserunt sint irure culpa duis non amet exercitation labore elit eu deserunt pariatur adipisicing. Nostrud est sint consequat irure. Laborum non quis qui reprehenderit laborum. dolore ea aliqua do.'
      }
    ]
  },
  {
    applicationId: 1,
    appliedAt: new Date(),
    userId: 2,
    name: 'James Joseph',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'accepted',
    email: 'james@james.com',
    resume: 'www.google.com',
    coverLetter: 'www.google.com',
    questions: [
      {
        question: 'Why do you want this job?',
        answer: 'Veniam nulla ad deserunt enim adipisicing ipsum excepteur et dolore sunt. Incididunt anim ea proident ullamco proident fugiat proident labore. Qui deserunt fugiat aute ex ut sunt deserunt id elit veniam proident. Amet nulla nostrud quis incididunt dolore.'
      },
      {
        question: 'Why would you fit this role?',
        answer: 'Sit aute do cillum aliquip dolore aliqua qui non laboris incididunt fugiat est. Duis veniam proident veniam sint et qui ut fugiat pariatur sunt tempor pariatur deserunt eu. Sint ipsum mollit eiusmod aliquip ipsum. Ullamco quis Lorem in dolor aliquip irure. Duis laborum ea aliqua fugiat aute est officia sunt Lorem. Ullamco nulla qui qui aliquip cupidatat ut deserunt adipisicing proident magna quis do officia.'
      }
    ]
  },
  {
    applicationId: 1,
    appliedAt: new Date(),
    userId: 2,
    name: 'James Joseph',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'rejected',
    email: 'james@james.com',
    resume: 'www.google.com',
    coverLetter: 'www.google.com',
    questions: [
      {
        question: 'Why do you want this job?',
        answer: 'Veniam nulla ad deserunt enim adipisicing ipsum excepteur et dolore sunt. Incididunt anim ea proident ullamco proident fugiat proident labore. Qui deserunt fugiat aute ex ut sunt deserunt id elit veniam proident. Amet nulla nostrud quis incididunt dolore.'
      },
      {
        question: 'Why would you fit this role?',
        answer: 'Sit aute do cillum aliquip dolore aliqua qui non laboris incididunt fugiat est. Duis veniam proident veniam sint et qui ut fugiat pariatur sunt tempor pariatur deserunt eu. Sint ipsum mollit eiusmod aliquip ipsum. Ullamco quis Lorem in dolor aliquip irure. Duis laborum ea aliqua fugiat aute est officia sunt Lorem. Ullamco nulla qui qui aliquip cupidatat ut deserunt adipisicing proident magna quis do officia.'
      }
    ]
  },
  {
    applicationId: 1,
    appliedAt: new Date(),
    userId: 2,
    name: 'James Joseph',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'rejected',
    email: 'james@james.com',
    resume: 'www.google.com',
    coverLetter: 'www.google.com',
    questions: [
      {
        question: 'Why do you want this job?',
        answer: 'Veniam nulla ad deserunt enim adipisicing ipsum excepteur et dolore sunt. Incididunt anim ea proident ullamco proident fugiat proident labore. Qui deserunt fugiat aute ex ut sunt deserunt id elit veniam proident. Amet nulla nostrud quis incididunt dolore.'
      },
      {
        question: 'Why would you fit this role?',
        answer: 'Sit aute do cillum aliquip dolore aliqua qui non laboris incididunt fugiat est. Duis veniam proident veniam sint et qui ut fugiat pariatur sunt tempor pariatur deserunt eu. Sint ipsum mollit eiusmod aliquip ipsum. Ullamco quis Lorem in dolor aliquip irure. Duis laborum ea aliqua fugiat aute est officia sunt Lorem. Ullamco nulla qui qui aliquip cupidatat ut deserunt adipisicing proident magna quis do officia.'
      }
    ]
  }
]

const user = {
  university: 'University of New South Wales',
  degree: "Bachelor's in Computer Science",
  major: 'Artificial Inteligence'
}

const Applications = () => {
  const [selectedApp, setSelectedApp] = useState(applications[0]);

  return (
    <Box>
      <Typography variant="h4" component="div">
        Applications
      </Typography>
      <Typography variant="h6" component="div" mt={2} mb={5}>
        Software Engineering Intern (Sydney)
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={3.5}>
          <Selector 
            applications={applications} 
            setSelectedApp={setSelectedApp} 
            selectedApp={selectedApp}
          />
        </Grid>
        <Grid item xs={8.5}>
          <Application application={selectedApp} />
        </Grid>
      </Grid>    
    </Box>
  )
}

const Selector = ({ applications, setSelectedApp, selectedApp }) => {
  return (
    <Box>
      <Typography variant="h5">
        {applications.length} Applicants
      </Typography>
      <List sx={{ mt: 2, maxHeight: '65vh', overflow: 'auto' }}>
        {applications.map(app => (
          <ListItem sx={{ p: 0, m: 0}}>
            <ListItemButton 
              sx={{ p: 5 }} 
              onClick={() => setSelectedApp(app)} 
              selected={true}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 5}}>
                <Avatar src={app.avatar} sx={{ height: 100, width: 100}} />
                <Box>
                  <Typography variant="h5" mb={1}>
                    {app.name}
                  </Typography>
                  <Typography variant="subtitle1" mb={1}>
                    {moment(app.appliedAt).fromNow()}
                  </Typography>
                  <Status status={app.status} />
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

const Status = ({ status }) => {
  const  toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  const color = () => {
    switch (status) {
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return '#3d70b2'
    }
  }
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: color() }}>
      {status === 'pending' ?
          <AccessTimeIcon />
        : status === 'rejected' ?
          <CloseIcon />
        : <CheckIcon />
      }
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {toTitleCase(status)}
      </Typography>
    </Box>
  )
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
              {application.status === 'pending' && <>
                <Button size="large" variant='contained' color='success'>Accept</Button>
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

export default Applications;