import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const PersonInfo = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography fontWeight="bold" fontFamily="inherit" variant="h6">
          Personal Info
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="email"
          label="Email"
          id="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="phone"
          name="phone"
          required
          fullWidth
          id="phone"
          label="Phone"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="personalWebsite"
          label="Personal Website"
          id="personalWebsite"
          autoComplete="personalWebsite"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="linkedIn"
          label="LinkedIn"
          id="linkedIn"
          autoComplete="linkedIn"
        />
      </Grid>
    </>
  );
};

export default PersonInfo;
