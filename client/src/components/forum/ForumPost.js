import React, { useState } from 'react';
import moment from 'moment';
import { Redirect, useLocation } from 'react-router-dom'
import { Link, Button, Card, CardContent, TextField, Box, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ForumPost = () => {
  const location = useLocation();
  const postId = location.pathname.split('/')[3]
  // API CALL
  const post = {
    title: "Job hunting sucks :(",
    author: 'Sarah Zheng',
    content: 'Velit ut cupidatat nostrud ea sunt Lorem id aliquip officia commodo nostrud commodo adipisicing. Excepteur voluptate ullamco ullamco labore ipsum minim nulla ea elit id esse minim duis. Laboris duis irure ullamco cillum. Cupidatat voluptate irure mollit pariatur consequat dolor irure exercitation ea deserunt aliqua. Do mollit occaecat ea nisi enim irure ad amet id eiusmod cillum. Cillum id ut in minim deserunt adipisicing non minim sit duis in sint proident. Laborum incididunt aute pariatur labore minim fugiat ut ullamco cupidatat laborum aliquip Lorem. \n Nulla nisi magna commodo fugiat nulla reprehenderit pariatur esse. Esse dolore ut consectetur mollit anim proident reprehenderit ad ullamco dolor nisi. Incididunt commodo dolore est duis exercitation eiusmod elit culpa ea elit. Ex laboris enim officia nostrud laborum consequat aliquip in amet excepteur aliqua pariatur Lorem ad. \n Dolore excepteur voluptate dolore sit aute voluptate ipsum anim non elit esse laboris. Ea cillum fugiat laborum aute minim proident sunt excepteur ex aute. Id laborum duis ad anim eiusmod cupidatat Lorem magna adipisicing et. Nisi amet laboris consectetur aute officia sunt nisi tempor.',
    createdAt: new Date(),
    comments: [
      {
        author: 'James Smith',
        createdAt: new Date(),
        content: 'Pariatur dolore duis ea deserunt. Nisi id magna pariatur amet ut. Mollit culpa aliqua quis Lorem duis. Cillum eu amet culpa pariatur labore id ad nulla esse excepteur ut.'
      },
      {
        author: 'James Smith',
        createdAt: new Date(),
        content: 'Cupidatat do aute do ea occaecat officia non eu Lorem velit. Incididunt cupidatat cillum nostrud culpa aute eu anim officia qui aliqua voluptate. Officia magna et veniam commodo velit. Anim enim officia Lorem ea laboris consectetur. \n Sint tempor aliqua non officia. Enim dolor ex enim voluptate non amet deserunt nisi nulla cillum adipisicing ipsum. Culpa proident quis ex sint esse labore. Non aliqua anim dolor laborum id.'
      },
      {
        author: 'James Smith',
        createdAt: new Date(),
        content: 'Pariatur dolore duis ea deserunt. Nisi id magna pariatur amet ut. Mollit culpa aliqua quis Lorem duis. Cillum eu amet culpa pariatur labore id ad nulla esse excepteur ut.'
      }
    ]
  };

  if (!post) {
    return (
      <Redirect to="/forum" />
    )
  }

  return (
    <Box sx={{ width: '60%', margin: 'auto '}}>
      <PostDetails post={post} />
      <PostComments post={post} />
    </Box>
  )
}

const PostDetails = ({ post }) => (
  <>
    <Typography variant="h4" component='div' sx={{ mb: 1 }}>
      {post.title}
    </Typography>
    <Box sx={{ mb: 1 }}>
      <Typography variant='subtitle1' color="primary" component="span">
        {post.author}
      </Typography>
      {" "}
      <Typography variant="body1" component='span' sx={{ mb: 1 }}>
        {moment(post.createdAt).fromNow()}
      </Typography> 
    </Box>
    <Typography variant="body1" component='div'>
      {post.content.split('\n').map(text => (
        <p>{text}</p>
      ))}
    </Typography>
  </>
)

const PostComments = ({ post }) => (
  <>
    <Typography variant="h5" component='div' sx={{ mt: 4 }}>
      {post.comments.length} Comment(s)
    </Typography>
    <TextField
      sx={{ mt: 3 }}
      id="comment"
      label="Comment"
      multiline
      rows={4}
      placeholder="What do you think?"
      fullWidth
    />
    <Button sx={{ mt: 2, px: 5 }} variant="contained" color='primary'>
      Post
    </Button>
    <Box sx={{ mt: 4 }}>
      {post.comments.map(comment => (
        <CommentCard comment={comment} />
      ))}
    </Box>
  </>
)

const CommentCard = ({ comment }) => {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ mb: 1 }}>
          <Typography variant='subtitle1' color="primary" component="span">
            {comment.author}
          </Typography>
          {" "}
          <Typography variant="body1" component='span' sx={{ mb: 1 }}>
            {moment(comment.createdAt).fromNow()}
          </Typography> 
        </Box>
        <Typography variant="body1" component='div'>
          {comment.content.split('\n').map(text => (
            <p>{text}</p>
          ))}
        </Typography>
        <Link 
          underline="none" 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setReplyOpen(!replyOpen)
          }}
          sx={{ display: 'flex', alignItems: 'center '}}
        >
          Reply 
          {replyOpen ? <KeyboardArrowDownIcon /> : <ChevronRight />}
        </Link>
        {replyOpen &&
          <Box>
            <TextField
              sx={{ mt: 3 }}
              id="reply"
              label="Reply"
              multiline
              rows={2}
              placeholder="What do you think?"
              fullWidth
            />
            <Button sx={{ mt: 2, px: 5 }} variant="contained" color='primary'>
              Post
            </Button>
          </Box>
        }
      </CardContent>
    </Card>
  )
}

export default ForumPost;