/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  CardActionArea,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PostCard from "./PostCard";

// const nComments = (comments) => (
//   comments.reduce((acc, curr) => {
//     return acc + 1 + curr.replies.length
//   }, 0)
// )

const fixedPosts = [
  {
    id: 1,
    title: "Horrible experence at XYZ, stay away!!",
    author: "Jim Sula",
    content:
      "Aliqua pariatur aliqua eiusmod voluptate laborum anim qui in. Laborum labore mollit proident anim sint excepteur quis et commodo. Consectetur in nisi duis ullamco culpa consectetur ipsum aliquip ex cillum laboris. Proident aliquip sint aute non consectetur nulla. Anim sunt laborum ut id aliquip id nostrud aliqua. Dolor cillum esse tempor minim.",
    createdAt: new Date("11/20/2005"),
    nComments: 5,
  },
  {
    id: 2,
    title: "Anyone else get ghosted by ABC??",
    author: "Sarah Zheng",
    content:
      "Et commodo ullamco tempor proident sit esse nisi proident amet anim. Ipsum tempor pariatur culpa ut irure do nulla non elit. Nostrud do duis est incididunt. Nostrud Lorem deserunt occaecat voluptate ad aliquip in quis cillum exercitation laboris anim ullamco pariatur. Dolore voluptate quis aliqua duis ipsum duis fugiat occaecat duis ipsum adipisicing. Mollit mollit ea adipisicing minim ut nulla eu nisi dolore aliquip do. Esse culpa fugiat sit mollit proident consectetur labore nisi culpa eu velit ipsum ad aliqua. Laborum elit anim ullamco enim tempor in eu consequat et velit non adipisicing ex nostrud. Excepteur consequat et nostrud dolor. Deserunt tempor voluptate mollit nisi dolor incididunt ipsum proident est cillum eu. Voluptate id ea deserunt non et id esse tempor qui. Veniam mollit incididunt veniam incididunt ipsum officia sit eiusmod est labore proident ex. Ullamco magna nostrud eu laborum labore.",
    createdAt: new Date("11/20/1999"),
    nComments: 10,
  },
  {
    id: 3,
    title: "Any tips for preparing for the MNO technical interview",
    author: "Eloise Emeru",
    content:
      "Et commodo ullamco tempor proident sit esse nisi proident amet anim. Ipsum tempor pariatur culpa ut irure do nulla non elit. Nostrud do duis est incididunt. Nostrud Lorem deserunt occaecat voluptate ad aliquip in quis cillum exercitation laboris anim ullamco pariatur. Dolore voluptate quis aliqua duis ipsum duis fugiat occaecat duis ipsum adipisicing. Mollit mollit ea adipisicing minim ut nulla eu nisi dolore aliquip do. Esse culpa fugiat sit mollit proident consectetur labore nisi culpa eu velit ipsum ad aliqua. Laborum elit anim ullamco enim tempor in eu consequat et velit non adipisicing ex nostrud. Excepteur consequat et nostrud dolor. Deserunt tempor voluptate mollit nisi dolor incididunt ipsum proident est cillum eu. Voluptate id ea deserunt non et id esse tempor qui. Veniam mollit incididunt veniam incididunt ipsum officia sit eiusmod est labore proident ex. Ullamco magna nostrud eu laborum labore.",
    createdAt: new Date(),
    nComments: 20,
  },
];

const IndustryForum = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [posts, setPosts] = useState(fixedPosts);

  useEffect(() => {
    // TODO NEED TO SEND REQUEST TO BACKEND
    // if (sortBy === 'newest') {
    //   const newest = [...posts].sort((a, b) => b.createdAt - a.createdAt);
    //   setPosts(newest)
    // } else if (sortBy === 'hot') {
    //   const hottest = [...posts].sort((a, b) => recentComments(b) - recentComments(a));
    //   setPosts(hottest);
    // }
  }, [sortBy]);

  // const recentComments = ({ comments }) => {
  //   let count = 0;

  //   comments.forEach(c => {
  //     if (moment().subtract(1, 'd').isBefore(moment(c.createdAt))) {
  //       count += 1;
  //       console.log('comment before')
  //     }
  //     count += c.replies.filter(r => moment().subtract(1, 'd').isBefore(moment(r.createdAt))).length
  //   })
  //   return count;
  // }

  return (
    <Box>
      <Header setSortBy={setSortBy} sortBy={sortBy} />
      <Box>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </Box>
    </Box>
  );
};

const Header = ({ setSortBy, sortBy }) => {
  const location = useLocation();
  const industry = location.pathname.split("/")[2];
  const title = industry.charAt(0).toUpperCase() + industry.slice(1);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      mb={2}
    >
      <Typography variant="h4" component="div">
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="sort">Sort By</InputLabel>
          <Select
            labelId="sort"
            id="sort-select"
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="hot">Hot</MenuItem>
            <MenuItem value="popular">All Time Popular</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="search"
          label="Search"
          sx={{ ml: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Button variant="outlined" color="primary">
          Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          sx={{ ml: 2 }}
          to={{ pathname: "/forum/create", state: { industry: title } }}
        >
          Create Post
        </Button>
      </Box>
    </Box>
  );
};

export default IndustryForum;
