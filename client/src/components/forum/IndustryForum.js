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
import { getPosts } from "../../api/forum-api";
import { getCompanyInfo, getPostedInternships } from "../../api/company-api";

const nComments = (comments) =>
  comments.reduce((acc, curr) => {
    return acc + 1 + curr.replies.length;
  }, 0);

const IndustryForum = () => {
  const [posts, setPosts] = useState([]);
  const [params, setParams] = useState({
    industry: useLocation().pathname.split("/")[2],
    sort: "newest",
    searchTerm: "",
    userId: "",
    pageNumber: 1,
  });

  useEffect(() => {
    const getData = async () => {
      const post = await getPosts(params);
      setPosts(post.result);
    };
    getData();
  }, [params]);

  return (
    <Box>
      <Header setParams={setParams} params={params} />
      <Box>
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </Box>
    </Box>
  );
};

const Header = ({ setParams, params }) => {
  const location = useLocation();
  const industry = location.pathname.split("/")[2];
  const title = industry.charAt(0).toUpperCase() + industry.slice(1);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
      mb={2}
    >
      <Typography variant="h4" component="div" sx={{ mb: "10px" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="sort">Sort By</InputLabel>
          <Select
            labelId="sort"
            id="sort-select"
            value={params.sort}
            label="Sort By"
            onChange={(e) => setParams({ ...params, sort: e.target.value })}
          >
            <MenuItem value="popular">All</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="search"
          label="Search"
          sx={{ ml: 2 }}
          value={params.searchTerm}
          onChange={(e) => setParams({ ...params, searchTerm: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        {/*<Button variant="outlined" color="primary">*/}
        {/*  Search*/}
        {/*</Button>*/}
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
