import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CompanySignup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const history = useHistory();

  const [foundedYear, setFoundedYear] = useState();
  const [size, setSize] = useState();

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px",
        width: "500px",
        height: "fit-content",
        gap: "40px",
        mx: "auto",
        mt: "100px",
        mb: "100px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        fontFamily="inherit"
      >
        Company Sign Up
      </Typography>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="conform-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight="bold" fontFamily="inherit" variant="h6">
              Recruiter:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="company-name"
              label="Company Name"
              id="company-name"
              autoComplete="company-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="industy"
              label="Industry"
              id="industry"
              autoComplete="industry"
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="url"
              label="Company URL"
              id="url"
              autoComplete="url"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                fullWidth
                label="Founded Year"
                openTo="year"
                views={["year"]}
                renderInput={(params) => <TextField {...params} />}
                value={foundedYear}
                onChange={(newValue) => {
                  setFoundedYear(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Company Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={size}
                label="Age"
                onChange={(newValue) => {
                  setSize(newValue);
                }}
              >
                <MenuItem value={"0-50"}>0-50</MenuItem>
                <MenuItem value={"50-200"}>50-200</MenuItem>
                <MenuItem value={"200-1000"}>200-1000</MenuItem>
                <MenuItem value={"1000-5000"}>1000-5000</MenuItem>
                <MenuItem value={"5000-10000"}>5000-10000</MenuItem>
                <MenuItem value={"10000+"}>10000+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="location"
              label="Location"
              id="location"
              autoComplete="location"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ margin: "auto" }}
          onClick={() => history.push("/login")}
        >
          Already has an account? Login!
        </Button>
      </Box>
    </Paper>
  );
};

export default CompanySignup;
