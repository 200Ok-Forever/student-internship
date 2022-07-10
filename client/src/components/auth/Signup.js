import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BusinessIcon from "@mui/icons-material/Business";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SchoolIcon from "@mui/icons-material/School";
import { Paper } from "@mui/material";

export default function SignUp() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={10}>
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 6,
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={12}>
              <Grid item xs={12} sm={6}>
                <Button>
                  <SchoolIcon fontSize="large" />
                </Button>
                <Typography fontWeight="bold">Student</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button>
                  <BusinessIcon fontSize="large" />
                </Button>
                <Typography fontWeight="bold">Recruiter</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
