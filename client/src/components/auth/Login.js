import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import { loginValidationSchema } from "./ValidationSchema";
import { LoginAPI } from "../../api/auth-api";
import { UserContext } from "./UserContext";
import { Modal } from "@mui/material";
import ErrorMessage from "../UI/ErrorMessage";

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
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
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const login = async (values) => {
        try {
          const res = await LoginAPI(values);
          if (res.status === true) {
            // If success, store the user info and token to UserContext then route to main page
            const userInfoWithToken = { token: res.token, ...res.user };
            document.cookie = "user" +'='+ res.token +'; Path=/;';
            setUser(userInfoWithToken);
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
        }
      };
      login(values);
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
        width: "fit-content",
        height: "500px",
        gap: "40px",
        mx: "auto",
        mt: "50px",
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
