import { Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";
import ShowExample from "./ShowExample";

const Skills = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const GetNewInfo = (value) => {
    setAllInfo((prev) => {
      let newInfo = { ...prev };
      newInfo["Skills"][1] = value;
      return newInfo;
    });
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
          Skills
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowExample section={"Projects"} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={allInfo.Skills ? allInfo?.Skills[1] : ""}
          onChange={(e) => GetNewInfo(e.target.value)}
        />
      </Grid>
    </>
  );
};

export default Skills;
