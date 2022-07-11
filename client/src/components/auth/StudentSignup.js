import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";

const StudentSignup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const history = useHistory();

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px",
        width: "fit-content",
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
        Student Sign up
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
              name="university"
              label="University"
              id="university"
              autoComplete="university"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="degree"
              label="Degree"
              id="degree"
              autoComplete="degree"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="major"
              label="Major"
              id="major"
              autoComplete="major"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="positions"
              label="What positions you are searching?"
              id="positions"
              autoComplete="positions"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="skills"
              label="Skills"
              id="skills"
              autoComplete="skills"
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

export default StudentSignup;
