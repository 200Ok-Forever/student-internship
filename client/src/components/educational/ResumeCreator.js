import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ResumeSectionBar from "./ResumeSectionBar";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LooksOneRoundedIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import { Paper } from "@mui/material";

const resumeItem = [
  { title: "Personal Information", contents: {} },
  { title: "Education", contents: [] },
  { title: "Project", contents: [] },
  { title: "Experience", contents: [] },
  { title: "Skills", contents: [] },
];

const ResumeCreator = () => {
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
        <LooksOneRoundedIcon />
        <NavigateNextOutlinedIcon />
        <LooksTwoOutlinedIcon />
        <NavigateNextOutlinedIcon />
        <Looks3OutlinedIcon />
      </Grid>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, alignItems: "center", justifyContents: "center" }}
      >
        Select and Order Sections
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          width: "fit-content",
          height: "fit-content",
          gap: "12px",
        }}
      >
        {resumeItem.map((item) => (
          <ResumeSectionBar title={item.title} />
        ))}
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
            width: "400px",
            height: "35px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <AddIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
          >
            Add Section
          </Typography>
        </Paper>
        <Button variant="contained" sx={{mt: "50px", marginLeft: "550px"}}>Next</Button>
      </Box>
    </Box>
  );
};

export default ResumeCreator;
