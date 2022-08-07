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
import { UserContext } from "../../store/UserContext";
import ErrorMessage from "../UI/ErrorMessage";
import { IconButton } from "@mui/material";
import SkillsSelect from "../UI/SkillsSelect";
import { newUserOnChat } from "../../api/chat-api";

const StudentSignup = () => {
  const { setUser } = useContext(UserContext);
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = (msg) => {
    setErrorMessage(msg);
    setErrorModalState(true);
  };
  const handleClose = () => setErrorModalState(false);
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      university: "",
      degree: "",
      major: "",
      positions: "",
      skills: [],
      description: "",
    },
    validationSchema: studentSignupValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const signup = async (values) => {
        const signupValues = {
          email: values.email,
          username: values.firstName + " " + values.lastName,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
          university: values.university,
          degree: values.degree,
          major: values.major,
          position: values.positions,
          skills: values.skills.map((s) => parseInt(s.id)),
          description: values.description,
          avatar: avatar,
        };
        try {
          const res = await StudentSignupAPI(signupValues);
          if (res.user) {
            const userInfo = res.user;
            const userInfoWithToken = { token: res.token, ...userInfo };
            window.localStorage.setItem(
              "user",
              JSON.stringify(userInfoWithToken)
            );
            setUser(userInfoWithToken);
            setLoading(false);

            const newUser = {
              username: userInfo.uid.toString(),
              secret: userInfo.uid.toString(),
              first_name: userInfo.username,
              last_name: userInfo.avatar,
            };
            await newUserOnChat(newUser);
            history.push("/");
          } else if (
            res.response.status === 404 ||
            res.response.status === 403 ||
            res.response.status === 400
          ) {
            console.log(res.response.data.message);
            handleOpen(res.response.data.message);
          } else {
            console.log(res);
            //handleOpen(res);
          }
        } catch (err) {
          console.log(err);
          //handleOpen(err);
          setLoading(false);
        }
      };
      signup(values);
    },
  });

  const history = useHistory();

  const onAvatarChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setAvatar(base64String);
    };
    reader.readAsDataURL(imageFile);
  };

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
        <ErrorMessage errorTitle={"Error"} errorMessage={errorMessage} />
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
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={onAvatarChange} />
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: "80px",
            height: "80px",
          }}
          src={avatar}
        />
      </IconButton>
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
              label="What positions you are searching? (Separated by comma)"
              id="positions"
              autoComplete="positions"
              value={formik.values.positions}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SkillsSelect
              label="Skills"
              onChange={(event, value) => {
                formik.setFieldValue("skills", value);
              }}
              value={formik.values.skills}
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
          disabled={loading}
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
