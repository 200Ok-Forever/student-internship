import React, {useState, useEffect, useContext} from "react";
import {useHistory, useParams} from "react-router-dom";
import {getPost, patchPost, postPost} from "../../api/forum-api";


import {
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {INDUSTRIES} from "./constants";
import {UserContext} from "../../store/UserContext";

const CreatePost = (props) => {
  const {id} = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(!!id);
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState(
    props.location.state?.industry || "General"
  );
  const [content, setContent] = useState("");
  const [anon, setAnon] = useState(false);
  
  useEffect(() => {
    const getData = async () => {
      if (id) {
        // TODO get post
        const data = await getPost(id);
        const post = data.post;
        setTitle(post.title);
        setIndustry(data.industry);
        setContent(post.content);
        setLoading(false);
      }

    }
    getData()
  }, [id]);
  
  const updateContent = async (id, data, token) => {
    const resp = await patchPost(id, {"content": data}, 'Bearer ' + token)
    if (resp.message === "update successfully") {
      history.push("/forum/posts/" + id);
    }
  }
  
  const postNewPost = async (data, token) => {
    console.log(data)
    const resp = await postPost(data, 'Bearer ' + token)
    console.log(resp);
    if (resp.postid) {
      history.push("/forum/posts/" + resp.postid);
    }
  }
  
  if (loading) {
    return;
  }
  
  return (
    <Box>
      <Typography variant="h4" component="div" sx={{mb: 1}}>
        {id ? "Edit" : "Create"} Post
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={8}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={id}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="industry">Industry</InputLabel>
            <Select
              labelId="industry"
              disabled={id}
              id="industry"
              value={industry.slice(0, 1).toUpperCase() + industry.slice(1).toLowerCase()}
              label="Industry"
              onChange={(e) => setIndustry(e.target.value)}
            >
              {INDUSTRIES.map((industry) => (
                <MenuItem value={industry}>{industry}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TextField
        sx={{mt: 3}}
        id="content"
        label="Content"
        multiline
        rows={10}
        placeholder="What are your thoughts?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
      />
      {!id && (
        <FormControlLabel
          control={<Checkbox/>}
          label="Post Anonymously"
          checked={anon}
          onChange={(e) => setAnon(e.target.checked)}
          sx={{mt: 2}}
        />
      )}
      <Box sx={{display: "flex", alignItems: "center", mt: 2}}>
        <Button color="primary" variant="contained" sx={{px: 5, mr: 3}}
                onClick={() => {
                  id ? updateContent(id, content, user.token) : postNewPost(
                    {
                      "Title": title,
                      "Content": content,
                      "Author": anon ? "Anonymous" : user.username,
                      "createdAt": new Date().toISOString(),
                      "Industry": industry,
                    }
                    , user.token)
                }}>
          Post
        </Button>
        <Link underline="none" href="#" onClick={history.goBack}>
          Cancel
        </Link>
      </Box>
    </Box>
  );
};

export default CreatePost;
