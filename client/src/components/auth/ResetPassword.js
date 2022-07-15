import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const ResetPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
        width: "fit-content",
        height: "500px",
        gap: "40px",
        mx: "auto",
        mt: "100px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        fontFamily="inherit"
      >
        New Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="reset-code"
          label="Reset Code"
          name="reset-code"
          autoComplete="reset-code"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="conform-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="confirm-password"
        />
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

export default ResetPassword;
