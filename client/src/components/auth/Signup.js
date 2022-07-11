import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BusinessIcon from "@mui/icons-material/Business";
import Typography from "@mui/material/Typography";
import SchoolIcon from "@mui/icons-material/School";
import { Paper } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory()

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
        Sign up
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={12}>
          <Grid item xs={12} sm={6}>
            <Button onClick={() => {history.push("/signup/student")}}>
              <SchoolIcon fontSize="large" />
            </Button>
            <Typography fontWeight="bold">Student</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={() => {history.push("/signup/company")}}>
              <BusinessIcon fontSize="large" />
            </Button>
            <Typography fontWeight="bold">Recruiter</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
