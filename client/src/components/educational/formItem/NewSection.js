import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const NewSection = ({ name }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          {name}
        </Typography>
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

export default NewSection;
