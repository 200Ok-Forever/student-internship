import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ShowCmts from "../UI/ShowCmts";
import EditAndDelete from "../UI/EditAndDelete";
import axios from "axios";
import { UserContext } from "../../store/UserContext";

const ForumPost = () => {
  const location = useLocation();
  const postNum = location.pathname.split("/")[3];
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    const getPostInfo = async () => {
      const resp = await axios.get(
        `http://localhost:5004/forum/posts/${postNum}`
      );
      setPost(resp.data);
      setComments(resp.data.comments);
      setIndustry(resp.data.industry);
    };
    getPostInfo();
  }, [postNum]);
  // API CALL
  // const post = {
  //   title: "Horrible experience at XYZ, stay away!!",
  //   author: "Sarah Zheng",
  //   content:
  //     "Velit ut cupidatat nostrud ea sunt Lorem id aliquip officia commodo nostrud commodo adipisicing. Excepteur voluptate ullamco ullamco labore ipsum minim nulla ea elit id esse minim duis. Laboris duis irure ullamco cillum. Cupidatat voluptate irure mollit pariatur consequat dolor irure exercitation ea deserunt aliqua. Do mollit occaecat ea nisi enim irure ad amet id eiusmod cillum. Cillum id ut in minim deserunt adipisicing non minim sit duis in sint proident. Laborum incididunt aute pariatur labore minim fugiat ut ullamco cupidatat laborum aliquip Lorem. \n Nulla nisi magna commodo fugiat nulla reprehenderit pariatur esse. Esse dolore ut consectetur mollit anim proident reprehenderit ad ullamco dolor nisi. Incididunt commodo dolore est duis exercitation eiusmod elit culpa ea elit. Ex laboris enim officia nostrud laborum consequat aliquip in amet excepteur aliqua pariatur Lorem ad. \n Dolore excepteur voluptate dolore sit aute voluptate ipsum anim non elit esse laboris. Ea cillum fugiat laborum aute minim proident sunt excepteur ex aute. Id laborum duis ad anim eiusmod cupidatat Lorem magna adipisicing et. Nisi amet laboris consectetur aute officia sunt nisi tempor.",
  //   createdAt: new Date(),
  //   comments: [
  //     {
  //       cmtId: "1",
  //       text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. ",
  //       createdAt: new Date(),
  //       avatar:
  //         "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
  //       username: "cmt_user1",
  //       reply: [
  //         {
  //           repliedId: "1",
  //           createdAt: new Date(),
  //           text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit, Lorem ipsum dolorf sit amet, consectetur adipiscing elit , Lorem ipsum dolorf sit amet, consectetur adipiscing elit  ",
  //           avatar:
  //             "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
  //           username: "reply1",
  //         },
  //       ],
  //     },
  //     {
  //       cmtId: "2",
  //       createdAt: new Date(),
  //       text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. ",
  //       avatar:
  //         "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
  //       username: "cmt_user2",
  //       reply: [],
  //     },
  //   ],
  // };

  // if (!post) {
  //   return <Redirect to="/forum" />;
  // }
  const sendCmt = async (newCmt) => {
    try {
      const data = {
        userID: newCmt.uid,
        Content: newCmt.text,
        createdAt: new Date(),
        replyID: 0,
      };
      const resp = await axios.post(
        `http://localhost:5004/forum/posts/${postNum}/comment`,
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("🚀 ~ resp", resp);
      if (resp.status === 200) {
        const cmtInfo = {
          text: newCmt.text,
          uid: newCmt.uid,
          time: new Date(),
          replied: [],
          cmtId: JSON.parse(resp.data).comment_id,
          avatar: newCmt.avatar,
          username: newCmt.username,
        };
        setComments((prev) => [cmtInfo].concat(prev));
      }
    } catch (e) {
      console.log(e);
    }
  };
  const sendReply = async (cmtId, newReply) => {
    try {
      const data = {
        userID: newReply.uid,
        Content: newReply.text,
        createdAt: new Date(),
        replyID: cmtId,
      };
      const resp = await axios.post(
        `http://localhost:5004/forum/posts/${postNum}/comment`,
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (resp.status === 200) {
        setComments((prev) => {
          const idx = prev.findIndex((e) => e.cmtId === cmtId);
          const cmt = prev[idx];
          const replyInfo = {
            repliedId: JSON.parse(resp.data).comment_id,
            text: newReply.text,
            time: new Date(),
            uid: newReply.uid,
            avatar: newReply.avatar,
            username: newReply.username,
          };
          if (cmt) {
            const new_replies = [replyInfo].concat(cmt.replied);
            const new_cmt = { ...cmt, replied: new_replies };
            prev.splice(idx, 1, new_cmt);
          }
          return [...prev];
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box>
        <PostDetails post={post.post} author={post.user} industry={industry} />
        {post?.post?.title && (
          <ShowCmts list={comments} sendCmt={sendCmt} sendReply={sendReply} />
        )}
      </Box>
    </>
  );
};

const PostDetails = ({ post, author, industry }) => {
  const { user } = useContext(UserContext);
  const isMine = user?.uid === author?.uid;

  return (
    <>
      {post?.title && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {post?.title}
            </Typography>
            {isMine && (
              <EditAndDelete
                id={post.id}
                token={user.token}
                industry={industry}
              />
            )}
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1" color="primary" component="span">
              {author?.username}
            </Typography>{" "}
            <Typography variant="body1" component="span" sx={{ mb: 1 }}>
              {moment(post?.created_time).fromNow()}
            </Typography>
          </Box>
          <Typography variant="body1" component="div">
            {post?.content.split("\n").map((text) => (
              <p>{text}</p>
            ))}
          </Typography>
        </>
      )}
    </>
  );
};

export default ForumPost;
