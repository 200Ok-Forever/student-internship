import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const Education = () => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          Education
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
          name="school"
          label="School"
          id="school"
          autoComplete="school"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="degree"
          label="Degree"
          id="degree"
          autoComplete="degree"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="major"
          label="Major"
          id="major"
          autoComplete="major"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          name="start"
          label="Start ('MM/YYYY')"
          id="start"
          autoComplete="start"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
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
      <Grid item xs={12}>
        <Button>
          <AddIcon />
          <Typography fontWeight="bold" fontFamily="inherit">
            Add Education
          </Typography>
        </Button>
      </Grid>
    </>
  );
};

export default Education;
