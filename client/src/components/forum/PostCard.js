import React, { useContext } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import moment from "moment";
import ChatIcon from "@mui/icons-material/Chat";
import classes from "./Forum.module.scss";
import {
  CardActionArea,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { deletePost } from "../../api/forum-api";
import { UserContext } from "../../store/UserContext";

const PostCard = ({ post }) => {
  console.log("🚀 ~ post", post);

  const history = useHistory();
  const { user } = useContext(UserContext);

  const delete_Post = async (id, token) => {
    const resp = await deletePost(id, "Bearer " + token);
    if (resp.message === "delete successfully") {
      history.push("/forum/posts");
    }
  };

  return (
    <Card sx={{ mb: 2 }} className={classes.cardHover}>
      <CardActionArea component={RouterLink} to={`/forum/posts/${post.id}`}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
              {post.title}
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1" color="primary" component="span">
              {post.authName}
            </Typography>{" "}
            <Typography variant="subtitle1" component="span" sx={{ mb: 1 }}>
              {moment(post.created_time).fromNow()}
            </Typography>
          </Box>
          <Box className={classes.postContent}>
            <Typography variant="body1" component="div">
              {post.content}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <ChatIcon color="primary" />
            <Typography variant="subtitle1" component="div" sx={{ ml: 1 }}>
              {post.nComments} Comments
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;
