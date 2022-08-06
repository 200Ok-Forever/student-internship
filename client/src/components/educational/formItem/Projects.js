import React, { useContext, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ShowExample from "./ShowExample";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";
import { RESUME_DATA, RESUME } from "../../../constants";
import AddIcon from "@mui/icons-material/Add";

const Projects = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const [numProj, setNumProj] = useState(
    allInfo.Relevant_Projects ? allInfo.Relevant_Projects.length - 1 : 0
  );

  const AddProjects = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Relevant_Projects;
      newInfo.push({ ...RESUME_DATA.Relevant_Projects });
      return { ...prev, Relevant_Projects: newInfo };
    });
    setNumProj((prev) => prev + 1);
  };

  const DeleteProjects = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Relevant_Projects;
      newInfo.pop();
      return { ...prev, Relevant_Projects: newInfo };
    });
    setNumProj((prev) => prev - 1);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          Relevant Projects
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowExample section={RESUME[3]} />
      </Grid>
      {[...Array(numProj).keys()].map((num) => (
        <ProjForm idx={num + 1} key={num + 1} />
      ))}
      <Grid item xs={12}>
        <Button onClick={AddProjects}>
          <AddIcon />
          <Typography fontWeight="bold" fontFamily="inherit">
            Add Project
          </Typography>
        </Button>
        {numProj !== 0 && (
          <Button onClick={DeleteProjects} sx={{ float: "right" }}>
            <Typography fontWeight="bold" fontFamily="inherit">
              Delete Project
            </Typography>
          </Button>
        )}
      </Grid>
    </>
  );
};

const ProjForm = ({ idx }) => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);

  const GetNewInfo = (name, value) => {
    setAllInfo((prev) => {
      let newInfo = prev.Relevant_Projects;
      newInfo[idx][name] = value;
      return { ...prev, Relevant_Projects: newInfo };
    });
  };
  const format = "Recommand Format: \n - xxx xxxx \n - xxx xxxx \n   .......";

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="projectName"
          label="Project Name"
          id={`proj_name_${idx}`}
          autoComplete="projectName"
          value={
            allInfo.Relevant_Projects
              ? allInfo?.Relevant_Projects[idx]?.Project_Name
              : ""
          }
          onChange={(e) => GetNewInfo("Project_Name", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id={`proj_des_${idx}`}
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={
            allInfo.Relevant_Projects
              ? allInfo?.Relevant_Projects[idx]?.Description
              : ""
          }
          onChange={(e) => GetNewInfo("Description", e.target.value)}
          placeholder={format}
        />
      </Grid>
    </>
  );
};

export default Projects;
