import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom'
import moment from 'moment';
import ChatIcon from '@mui/icons-material/Chat';
import classes from './Forum.module.scss';
import { CardActionArea, Typography, Box, Card, CardContent } from '@mui/material';
import EditAndDelete from '../UI/EditAndDelete';

const PostCard = ({ post }) => {
  // TODO
  const isMine = true;
  const history = useHistory();

  return (
    <Card sx={{ mb: 2 }} className={classes.cardHover}>
      <CardActionArea component={RouterLink} to={`/forum/posts/${post.id}`}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" component='div' sx={{ mb: 1 }}>
              {post.title}
            </Typography>
            {isMine &&
              <EditAndDelete 
                onEdit={() => history.push(`/forum/${post.id}/edit`)}
              />
            }
          </Box>
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
}

export default PostCard;