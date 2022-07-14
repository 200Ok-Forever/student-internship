import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (event) => {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    },
  });

  return (
    <Paper
      elevation={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "36px",
        width: "450px",
        height: "500px",
        gap: "40px",
        mx: "auto",
        mt: "50px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        fontFamily="inherit"
      >
        Log in
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Grid container>
          <Link
            href="#"
            variant="body2"
            onClick={() => history.push("/passwordreset/send")}
          >
            Forgotten password?
          </Link>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ margin: "auto" }}
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
