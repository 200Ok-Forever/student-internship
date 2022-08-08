import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { postPost } from "../../api/auth-api";

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
import { INDUSTRIES } from "./constants";

const CreatePost = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(!!id);

  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState(
    props.location.state?.industry || "General"
  );
  const [content, setContent] = useState("");
  const [anon, setAnon] = useState(false);

  useEffect(() => {
    if (id) {
      // TODO get post
      // const response = postPost(id);
      console.log()
      const post = {
        title: "test",
        industry: "Arts",
        content:
          "Exercitation quis mollit mollit nulla deserunt sunt ut ad occaecat ipsum occaecat minim adipisicing. Ut Lorem excepteur et dolor adipisicing dolore. Veniam occaecat do duis culpa dolor esse culpa. Excepteur eu mollit exercitation proident nisi ullamco aliqua laboris ex tempor do non amet magna. Proident laborum do sunt Lorem ut velit sunt ea aute ex qui id mollit cillum. Irure est commodo officia eu ea. Ea laborum nulla ullamco aliqua incididunt mollit.",
      };
      setTitle(post.title);
      setIndustry(post.industry);
      setContent(post.content);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return;
  }

  return (
    <Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
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
              value={industry}
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
        sx={{ mt: 3 }}
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
          control={<Checkbox />}
          label="Post Anonymously"
          checked={anon}
          onChange={(e) => setAnon(e.target.checked)}
          sx={{ mt: 2 }}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Button color="primary" variant="contained" sx={{ px: 5, mr: 3 }}>
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
