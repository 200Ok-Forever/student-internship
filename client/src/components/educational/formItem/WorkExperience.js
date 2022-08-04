import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ShowExample from "./ShowExample";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";
import { RESUME_DATA } from "../../../constants";

const WorkExperience = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const [numWork, setNumWork] = useState(
    allInfo.Work_Experience ? allInfo.Work_Experience.length - 1 : 0
  );

  const AddWork = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Work_Experience;
      newInfo.push({ ...RESUME_DATA.Work_Experience });
      return { ...prev, Work_Experience: newInfo };
    });
    setNumWork((prev) => prev + 1);
  };

  const DeleteWork = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Work_Experience;
      newInfo.pop();
      return { ...prev, Work_Experience: newInfo };
    });
    setNumWork((prev) => prev - 1);
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
          Work Experience
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowExample section={"Work"} />
      </Grid>
      {[...Array(numWork).keys()].map((num) => (
        <WorkForm idx={num + 1} key={num + 1} />
      ))}
      <Grid item xs={12}>
        <Button onClick={AddWork}>
          <AddIcon />
          <Typography fontWeight="bold" fontFamily="inherit">
            Add Experience
          </Typography>
        </Button>
        {numWork !== 0 && (
          <Button onClick={DeleteWork} sx={{ float: "right" }}>
            <Typography fontWeight="bold" fontFamily="inherit">
              Delete Experience
            </Typography>
          </Button>
        )}
      </Grid>
    </>
  );
};

const WorkForm = ({ idx }) => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);

  const GetNewInfo = (name, value) => {
    setAllInfo((prev) => {
      let newInfo = prev.Work_Experience;
      newInfo[idx][name] = value;
      return { ...prev, Work_Experience: newInfo };
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="company"
          label="Company"
          id={`company_${idx}`}
          autoComplete="company"
          value={
            allInfo.Work_Experience
              ? allInfo?.Work_Experience[idx]?.Company
              : ""
          }
          onChange={(e) => GetNewInfo("Company", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="position"
          label="Position"
          id={`pos_${idx}`}
          autoComplete="position"
          value={
            allInfo.Work_Experience
              ? allInfo?.Work_Experience[idx]?.Position
              : ""
          }
          onChange={(e) => GetNewInfo("Position", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          name="start"
          label="Start ('MM/YYYY')"
          id={`comp_start_${idx}`}
          autoComplete="start"
          fullWidth
          value={
            allInfo.Work_Experience ? allInfo?.Work_Experience[idx]?.Start : ""
          }
          onChange={(e) => GetNewInfo("Start", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          name="end"
          label="End ('MM/YYYY' or 'Now')"
          id={`comp_end_${idx}`}
          autoComplete="end"
          fullWidth
          value={
            allInfo.Work_Experience ? allInfo?.Work_Experience[idx]?.End : ""
          }
          onChange={(e) => GetNewInfo("End", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id={`comp_des_${idx}`}
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={
            allInfo.Work_Experience
              ? allInfo?.Work_Experience[idx]?.Description
              : ""
          }
          onChange={(e) => GetNewInfo("Description", e.target.value)}
        />
      </Grid>
    </>
  );
};

export default WorkExperience;
