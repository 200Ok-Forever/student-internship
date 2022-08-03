import React from 'react';
import { Typography, Box } from '@mui/material';
import PostCard from './PostCard';

const fixedPosts = [
  {
    title: "Horrible experence at XYZ, stay away!!",
    author: 'Jim Sula',
    content: 'Aliqua pariatur aliqua eiusmod voluptate laborum anim qui in. Laborum labore mollit proident anim sint excepteur quis et commodo. Consectetur in nisi duis ullamco culpa consectetur ipsum aliquip ex cillum laboris. Proident aliquip sint aute non consectetur nulla. Anim sunt laborum ut id aliquip id nostrud aliqua. Dolor cillum esse tempor minim.',
    createdAt: new Date("11/20/2005"),
    nComments: 5,
  },
  {
    title: "Anyone else get ghosted by ABC??",
    author: 'Sarah Zheng',
    content: 'Et commodo ullamco tempor proident sit esse nisi proident amet anim. Ipsum tempor pariatur culpa ut irure do nulla non elit. Nostrud do duis est incididunt. Nostrud Lorem deserunt occaecat voluptate ad aliquip in quis cillum exercitation laboris anim ullamco pariatur. Dolore voluptate quis aliqua duis ipsum duis fugiat occaecat duis ipsum adipisicing. Mollit mollit ea adipisicing minim ut nulla eu nisi dolore aliquip do. Esse culpa fugiat sit mollit proident consectetur labore nisi culpa eu velit ipsum ad aliqua. Laborum elit anim ullamco enim tempor in eu consequat et velit non adipisicing ex nostrud. Excepteur consequat et nostrud dolor. Deserunt tempor voluptate mollit nisi dolor incididunt ipsum proident est cillum eu. Voluptate id ea deserunt non et id esse tempor qui. Veniam mollit incididunt veniam incididunt ipsum officia sit eiusmod est labore proident ex. Ullamco magna nostrud eu laborum labore.',
    createdAt: new Date("11/20/1999"),
    nComments: 10,
  },
  {
    title: "Any tips for preparing for the MNO technical interview",
    author: 'Eloise Emeru',
    content: 'Et commodo ullamco tempor proident sit esse nisi proident amet anim. Ipsum tempor pariatur culpa ut irure do nulla non elit. Nostrud do duis est incididunt. Nostrud Lorem deserunt occaecat voluptate ad aliquip in quis cillum exercitation laboris anim ullamco pariatur. Dolore voluptate quis aliqua duis ipsum duis fugiat occaecat duis ipsum adipisicing. Mollit mollit ea adipisicing minim ut nulla eu nisi dolore aliquip do. Esse culpa fugiat sit mollit proident consectetur labore nisi culpa eu velit ipsum ad aliqua. Laborum elit anim ullamco enim tempor in eu consequat et velit non adipisicing ex nostrud. Excepteur consequat et nostrud dolor. Deserunt tempor voluptate mollit nisi dolor incididunt ipsum proident est cillum eu. Voluptate id ea deserunt non et id esse tempor qui. Veniam mollit incididunt veniam incididunt ipsum officia sit eiusmod est labore proident ex. Ullamco magna nostrud eu laborum labore.',
    createdAt: new Date(),
    nComments: 20
  },
];

const UserPosts = () => {
  return (
    <Box>
      <Typography variant="h4" component='div'>
        My Forum Posts
      </Typography>
      <Box mt={2}>
        {fixedPosts.map(post => (
          <PostCard post={post} />
        ))}
      </Box>
    </Box>
  )
}

export default UserPosts;