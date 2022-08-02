import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ApplicationSelector from './ApplicationSelector';
import Application from './Application';

const applications = [
  {
    applicationId: 1,
    appliedAt: new Date(),
    userId: 2,
    name: 'James Joseph',
    shortlist: true,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    status: 'Tech Interview',
    email: 'james@james.com',
    resume: 'www.google.com',
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
    applicationId: 2,
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
    applicationId: 3,
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
    applicationId: 4,
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
          <ApplicationSelector 
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

export default Applications;