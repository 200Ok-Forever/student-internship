import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { RESUME } from "../../constants";
import PersonInfo from "./formItem/PersonInfo";
import Education from "./formItem/Education";
import WorkExperience from "./formItem/WorkExperience";
import Projects from "./formItem/Projects";
import Skills from "./formItem/Skills";
import NewSection from "./formItem/NewSection";

const ResumeForm = ({ order }) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={() => {}}
      sx={{
        padding: "36px",
        width: "53vw",
        height: "fit-content",
        mx: "auto",
        mb: "10px",
      }}
    >
      <Grid container spacing={2}>
        {order?.map((section, idx) => {
          if (section === RESUME[0]) {
            return <PersonInfo key={idx} />;
          } else if (section === RESUME[1]) {
            return <Education key={idx} />;
          } else if (section === RESUME[2]) {
            return <WorkExperience key={idx} />;
          } else if (section === RESUME[3]) {
            return <Projects key={idx} />;
          } else if (section === RESUME[4]) {
            return <Skills key={idx} />;
          }
          return <NewSection name={section} key={idx} />;
        })}
      </Grid>
    </Box>
  );
};

export default ResumeForm;
