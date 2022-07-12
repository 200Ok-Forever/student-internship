import React from 'react';
import moment from 'moment';
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Button, CardActionArea, Typography, Box, Card, CardContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import classes from './Forum.module.scss';

const posts = [
  {
    title: "How do i get a job?",
    author: 'Jim Sula',
    content: 'Aliqua pariatur aliqua eiusmod voluptate laborum anim qui in. Laborum labore mollit proident anim sint excepteur quis et commodo. Consectetur in nisi duis ullamco culpa consectetur ipsum aliquip ex cillum laboris. Proident aliquip sint aute non consectetur nulla. Anim sunt laborum ut id aliquip id nostrud aliqua. Dolor cillum esse tempor minim.',
    createdAt: new Date(),
    nComments: 12
  },
  {
    title: "Job hunting sucks :(",
    author: 'Sarah Zheng',
    content: 'Et commodo ullamco tempor proident sit esse nisi proident amet anim. Ipsum tempor pariatur culpa ut irure do nulla non elit. Nostrud do duis est incididunt. Nostrud Lorem deserunt occaecat voluptate ad aliquip in quis cillum exercitation laboris anim ullamco pariatur. Dolore voluptate quis aliqua duis ipsum duis fugiat occaecat duis ipsum adipisicing. Mollit mollit ea adipisicing minim ut nulla eu nisi dolore aliquip do. Esse culpa fugiat sit mollit proident consectetur labore nisi culpa eu velit ipsum ad aliqua. Laborum elit anim ullamco enim tempor in eu consequat et velit non adipisicing ex nostrud. Excepteur consequat et nostrud dolor. Deserunt tempor voluptate mollit nisi dolor incididunt ipsum proident est cillum eu. Voluptate id ea deserunt non et id esse tempor qui. Veniam mollit incididunt veniam incididunt ipsum officia sit eiusmod est labore proident ex. Ullamco magna nostrud eu laborum labore.',
    createdAt: new Date(),
    nComments: 123
  }
];

const IndustryForum = () => {
  const location = useLocation();
  const industry = location.pathname.split('/')[2];
  const title = industry.charAt(0).toUpperCase() + industry.slice(1);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h4" component='div' sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to={{ pathname: '/forum/create', state: { industry: title }}}
        >
          Create Post
        </Button>
      </Box>
      <Box>
        {posts.map(post => (
          <PostCard post={post} />
        ))}
      </Box>
    </Box>
  )
}

const PostCard = ({ post }) => (
  <Card sx={{ mb: 2 }} className={classes.cardHover}>
    <CardActionArea component={RouterLink} to={`/forum/posts/${post.id}`}>
      <CardContent>
        <Typography variant="h5" component='div' sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant='subtitle1' color="primary" component="span">
            {post.author}
          </Typography>
          {" "}
          <Typography variant="subtitle1" component='span' sx={{ mb: 1 }}>
            {moment(post.createdAt).fromNow()}
          </Typography> 
        </Box>
        <Box className={classes.postContent}>
          <Typography variant="body1" component='div'>
            {post.content}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <ChatIcon color="primary" />
          <Typography variant="subtitle1" component='div' sx={{ ml: 1 }}>
            {post.nComments} Comments
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
)

export default IndustryForum;