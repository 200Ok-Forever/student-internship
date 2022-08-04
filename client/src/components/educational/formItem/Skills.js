import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Skills = () => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          Skills
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

export default Skills;
