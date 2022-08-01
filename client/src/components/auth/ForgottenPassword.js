import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { sendResetEmailValidationSchema } from "./ValidationSchema";
import { sendResetEmailAPI } from "../../api/auth-api";
import { useFormik } from "formik";
import { Modal } from "@mui/material";

const ForgottenPassword = () => {
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
    },
    validationSchema: sendResetEmailValidationSchema,
    onSubmit: (values) => {
      const sendEmail = async (values) => {
        try {
          const res = await sendResetEmailAPI(values);
          if (res.status === true) {
            // If success, store the user info and token to UserContext then route to main page
            history.push("/passwordreset/reset");
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
          handleOpen(err);
        }
      };
      sendEmail(values);
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
        height: "fit-content",
        gap: "40px",
        mx: "auto",
        mt: "175px",
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
        Reset Password
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
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Password Email
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            history.push("/passwordreset/reset");
          }}
        >
          Has an Email? Reset Now!
        </Button>
      </Box>
    </Paper>
  );
};

export default ForgottenPassword;
