import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { UserContext } from "../../store/UserContext";
import { CompanySignupAPI } from "../../api/auth-api";
import { useFormik } from "formik";
import { companyEditValidationSchema } from "../auth/ValidationSchema";
import { Modal, IconButton } from "@mui/material";
import ErrorMessage from "../UI/ErrorMessage";

const EditCompanyProfile = () => {
  const { setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = (msg) => {
    setErrorMessage(msg);
    setErrorModalState(true);
  };
  const handleClose = () => setErrorModalState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      company_name: "",
      industry: "",
      linkedin: "",
      founded_year: "",
      size: "",
      company_url: "",
      location: "",
      description: "",
    },
    validationSchema: companyEditValidationSchema,
    onSubmit: (values) => {
      const edit = async (values) => {
        const signupValues = {
          first_name: values.firstName,
          last_name: values.lastName,
          company_name: values.company_name,
          industry: values.industry,
          linkedin: values.linkedin,
          company_url: values.company_url,
          location: values.location,
          description: values.description,
          avatar: "",
          company_logo: avatar,
          company_size: values.size,
          founded_year: values.founded_year,
        };
        console.log(signupValues);
        // try {
        //   const res = await CompanySignupAPI(signupValues);
        //   if (res.status === true) {
        //     const userInfo = res.user;
        //     const userInfoWithToken = { token: res.token, ...userInfo };
        //     setUser(userInfoWithToken);
        //     history.push("/");
        //   } else if (
        //     res.response.status === 404 ||
        //     res.response.status === 403 ||
        //     res.response.status === 400
        //   ) {
        //     console.log(res);
        //     handleOpen(res.response.data.message);
        //   } else {
        //     console.log(res);
        //     //handleOpen(res);
        //   }
        // } catch (err) {
        //   console.log(err);
        //   //handleOpen(err);
        // }
      };
      edit(values);
    },
  });

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
        <Modal
          open={errorModalState}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ErrorMessage errorMessage={errorMessage} />
        </Modal>
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
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="company_name"
              label="Company Name"
              id="company_name"
              autoComplete="company_name"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              error={
                formik.touched.company_name &&
                Boolean(formik.errors.company_name)
              }
              helperText={
                formik.touched.company_name && formik.errors.company_name
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="industry"
              label="Industry"
              id="industry"
              autoComplete="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="linkedin"
              label="LinkedIn"
              id="linkedin"
              autoComplete="linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="company_url"
              label="Company URL"
              id="company_url"
              autoComplete="company_url"
              value={formik.values.company_url}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="founded_year"
              label="Founded Year (YYYY)"
              id="founded_year"
              autoComplete="founded_year"
              value={formik.values.founded_year}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Company Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="size"
                name="size"
                autoComplete="size"
                value={formik.values.size}
                label="Size"
                onChange={formik.handleChange}
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
              value={formik.values.location}
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
          Edit
        </Button>
      </Box>
    </Paper>
  );
};

export default EditCompanyProfile;
