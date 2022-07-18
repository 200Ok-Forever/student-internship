import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const ResumeCreatorStep2 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        width: "fit-content",
        height: "fit-content",
        gap: "30px",
        mx: "auto",
        mt: "auto",
        mb: "100px",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, alignItems: "center", justifyContents: "center" }}
      >
        Create Your Resume
      </Typography>
      <Grid>
        <LooksOneOutlinedIcon />
        <NavigateNextOutlinedIcon />
        <LooksTwoRoundedIcon />
        <NavigateNextOutlinedIcon />
        <Looks3OutlinedIcon />
      </Grid>
      <Box
        component="form"
        noValidate
        onSubmit={() => {}}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "36px",
          width: "500px",
          height: "fit-content",
          mx: "auto",
          mb: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight="bold" fontFamily="inherit" variant="h6">
              Personal Info
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="phone"
              name="phone"
              required
              fullWidth
              id="phone"
              label="Phone"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="personalWebsite"
              label="Personal Website"
              id="personalWebsite"
              autoComplete="personalWebsite"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="linkedIn"
              label="LinkedIn"
              id="linkedIn"
              autoComplete="linkedIn"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              fontWeight="bold"
              fontFamily="inherit"
              variant="h6"
              sx={{ mt: 2 }}
            >
              Education
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx>
            <Button sx={{ float: "right" }}>
              <VisibilityIcon />
              <Typography fontFamily="inherit" variant="p" sx={{ mt: 2 }}>
                Show Example
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="school"
              label="School"
              id="school"
              autoComplete="school"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="degree"
              label="Degree"
              id="degree"
              autoComplete="degree"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="major"
              label="Major"
              id="major"
              autoComplete="major"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="start"
              label="Start ('MM/YYYY')"
              id="start"
              autoComplete="start"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="end"
              label="End ('MM/YYYY' or 'Now')"
              id="end"
              autoComplete="end"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button>
              <AddIcon />
              <Typography fontWeight="bold" fontFamily="inherit">
                Add Education
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              fontWeight="bold"
              fontFamily="inherit"
              variant="h6"
              sx={{ mt: 2 }}
            >
              Work Experience
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx>
            <Button sx={{ float: "right" }}>
              <VisibilityIcon />
              <Typography fontFamily="inherit" variant="p" sx={{ mt: 2 }}>
                Show Example
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="company"
              label="Company"
              id="company"
              autoComplete="company"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="position"
              label="Position"
              id="position"
              autoComplete="position"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="start"
              label="Start ('MM/YYYY')"
              id="start"
              autoComplete="start"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="end"
              label="End ('MM/YYYY' or 'Now')"
              id="end"
              autoComplete="end"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button>
              <AddIcon />
              <Typography fontWeight="bold" fontFamily="inherit">
                Add Experience
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              fontWeight="bold"
              fontFamily="inherit"
              variant="h6"
              sx={{ mt: 2 }}
            >
              Relavant Projects
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx>
            <Button sx={{ float: "right" }}>
              <VisibilityIcon />
              <Typography fontFamily="inherit" variant="p" sx={{ mt: 2 }}>
                Show Example
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="projectName"
              label="Project Name"
              id="projectName"
              autoComplete="projectName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="role"
              label="Role"
              id="role"
              autoComplete="role"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="start"
              label="Start ('MM/YYYY')"
              id="start"
              autoComplete="start"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="end"
              label="End ('MM/YYYY' or 'Now')"
              id="end"
              autoComplete="end"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              fontWeight="bold"
              fontFamily="inherit"
              variant="h6"
              sx={{ mt: 2 }}
            >
              Skills
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx>
            <Button sx={{ float: "right" }}>
              <VisibilityIcon />
              <Typography fontFamily="inherit" variant="p" sx={{ mt: 2 }}>
                Show Example
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              label="Description"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
        </Grid>
      </Box>
      <Button variant="contained" sx={{ marginLeft: "550px" }}>
        Next
      </Button>
    </Box>
  );
};

export default ResumeCreatorStep2;
