import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { resetPasswordValidationSchema } from "./ValidationSchema";
import { resetPasswordAPI } from "../../api/auth-api";
import ErrorMessage from "../UI/ErrorMessage";
import { Modal } from "@mui/material";

const ResetPassword = () => {
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
      email: "",
      password: "",
      confirmPassword: "",
      resetCode: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      const resetPassword = async (values) => {
        const apiValues = {
          email: values.email,
          password: values.password,
          verification_code: values.resetCode,
        };
        try {
          const res = await resetPasswordAPI(apiValues);
          if (res.status === true) {
            // If success, goes to login page
            history.push("/login");
          } else if (
            res.response.status === 404 ||
            res.response.status === 403 ||
            res.response.status === 400
          ) {
            console.log(res.response.data.message);
            handleOpen(res.response.data.message);
          } else {
            console.log(res);
          }
        } catch (err) {
          console.log(err);
        }
      };
      resetPassword(values);
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
        height: "500px",
        gap: "40px",
        mx: "auto",
        mt: "100px",
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
        New Password
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          autoComplete="email"
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
          autoComplete="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="confirmPassword"
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="resetCode"
          label="Reset Code"
          name="resetCode"
          autoComplete="resetCode"
          autoFocus
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          error={formik.touched.resetCode && Boolean(formik.errors.resetCode)}
          helperText={formik.touched.resetCode && formik.errors.resetCode}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            history.push("/passwordreset/send");
          }}
        >
          Haven't got an Email? Send Now!
        </Button>
      </Box>
    </Paper>
  );
};

export default ResetPassword;
