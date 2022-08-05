import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { studentEditValidationSchema } from "../auth/ValidationSchema";
import { Paper, IconButton } from "@mui/material";
import { UserContext } from "../../store/UserContext";
import ErrorMessage from "../UI/ErrorMessage";
import { changeAvatarApi, editStudentProfileAPI } from "../../api/auth-api";
import { useHistory } from "react-router-dom";

const EditStudentProfile = () => {
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = (msg) => {
    setErrorMessage(msg);
    setErrorModalState(true);
  };
  const handleClose = () => {
    setErrorModalState(false);
    history.push("/");
  };

  const [avatar, setAvatar] = useState(user.avatar);
  const onAvatarChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setAvatar(base64String);
    };
    reader.readAsDataURL(imageFile);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      university: "",
      degree: "",
      major: "",
      positions: "",
      skills: "",
      description: "",
    },
    validationSchema: studentEditValidationSchema,
    onSubmit: (values) => {
      const edit = async (values) => {
        const editValues = {
          first_name: values.firstName,
          last_name: values.lastName,
          university: values.university,
          degree: values.degree,
          major: values.major,
          position: values.positions,
          skills: values.skills,
          description: values.description,
        };
        console.log(editValues, user.token);
        try {
          const res = await editStudentProfileAPI(editValues, user.token);
          if (res.status === true) {
            console.log("User infomation changed!");
            handleOpen("User infomation changed!");
          } else if (
            res.response.status === 404 ||
            res.response.status === 403 ||
            res.response.status === 400 ||
            res.response.status === 401
          ) {
            console.log(res);
            handleOpen(res.response.data.msg);
          } else {
            console.log(res);
            //handleOpen(res);
          }
          console.log(editValues);
        } catch (err) {
          console.log(err);
          handleOpen(err);
        }
      };

      const changeAvatar = async () => {
        await changeAvatarApi({ avatar: avatar }, user.token);
      };
      edit(values);
      changeAvatar();
      user.token = user.token;
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
        <ErrorMessage errorMessage={errorMessage} />
      </Modal>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        fontFamily="inherit"
      >
        Edit Profile
      </Typography>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={onAvatarChange} />
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }} src={avatar} />
      </IconButton>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
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
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default EditStudentProfile;
