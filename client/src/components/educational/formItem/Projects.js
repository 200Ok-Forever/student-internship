import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Projects = () => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          Relavant Projects
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} sx>
        <Button sx={{ float: "right" }}>
          <VisibilityIcon />
          <Typography fontFamily="inherit" variant="p" sx={{ mt: 2 }}>
            Show Example
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="projectName"
          label="Project Name"
          id="projectName"
          autoComplete="projectName"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="start"
          label="Start ('MM/YYYY')"
          id="start"
          autoComplete="start"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="end"
          label="End ('MM/YYYY' or 'Now')"
          id="end"
          autoComplete="end"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          label="Description"
          multiline
          fullWidth
          rows={4}
        />
      </Grid>
    </>
  );
};

export default Projects;
