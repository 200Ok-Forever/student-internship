import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { studentSignupValidationSchema } from "./ValidationSchema";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import { StudentSignupAPI } from "../../api/auth-api";
import { UserContext } from "./UserContext";

const StudentSignup = () => {
  const { user, setUser } = useContext(UserContext);
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = (msg) => {
    setErrorMessage(msg);
    setErrorModalState(true);
  };
  const handleClose = () => setErrorModalState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      firstName: "",
      lastName: "",
      university: "",
      degree: "",
      major: "",
      positions: "",
      skills: "",
      description: "",
    },
    validationSchema: studentSignupValidationSchema,
    onSubmit: (values) => {
      const signup = async (values) => {
        const signupValues = {
          email: values.email,
          username: values.username,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
          university: values.university,
          degree: values.degree,
          major: values.major,
          skills: values.skills,
          description: values.description,
          avatar: "",
        };
        try {
          const res = await StudentSignupAPI(signupValues);
          if (res.status === true) {
            const userInfo = res.user;
            const userInfoWithToken = { token: res.token, ...userInfo };
            setUser(userInfoWithToken);
          } else if (
            res.response.status === 404 ||
            res.response.status === 403 ||
            res.response.status === 400
          ) {
            console.log(res.response.data.message);
            handleOpen(res.response.data.message);
          } else {
            console.log(res);
            handleOpen(res);
          }
        } catch (err) {
          console.log(err);
          handleOpen(err);
        }
      };
      signup(values);
    },
  });

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
        width: "500px",
        height: "fit-content",
        gap: "40px",
        mx: "auto",
        mb: "100px",
      }}
    >
      <Modal
        open={errorModalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        fontFamily="inherit"
      >
        Student Sign Up
      </Typography>
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="username"
              label="Username"
              id="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
              value={formik.values.university}
              onChange={formik.handleChange}
              error={
                formik.touched.university && Boolean(formik.errors.university)
              }
              helperText={formik.touched.university && formik.errors.university}
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
              value={formik.values.degree}
              onChange={formik.handleChange}
              error={formik.touched.degree && Boolean(formik.errors.degree)}
              helperText={formik.touched.degree && formik.errors.degree}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="major"
              label="Major"
              id="major"
              autoComplete="major"
              value={formik.values.major}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="positions"
              label="What positions you are searching?"
              id="positions"
              autoComplete="positions"
              value={formik.values.positions}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="skills"
              label="Skills"
              id="skills"
              autoComplete="skills"
              value={formik.values.skills}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
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
