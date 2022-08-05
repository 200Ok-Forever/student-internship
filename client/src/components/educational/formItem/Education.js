import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import ShowExample from "./ShowExample";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";
import { useState } from "react";
import { RESUME_DATA } from "../../../constants";
import PickDate from "../../UI/PickDate";

const Education = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const [numEducation, setNumEducation] = useState(
    allInfo.Education ? allInfo.Education.length - 1 : 0
  );

  const AddEducation = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Education;
      newInfo.push({ ...RESUME_DATA.Education });
      return { ...prev, Education: newInfo };
    });
    setNumEducation((prev) => prev + 1);
  };

  const DeleteEducation = () => {
    setAllInfo((prev) => {
      let newInfo = prev.Education;
      newInfo.pop();
      return { ...prev, Education: newInfo };
    });
    setNumEducation((prev) => prev - 1);
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
          Education
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ShowExample section={"Education"} />
      </Grid>
      {[...Array(numEducation).keys()].map((num) => (
        <EducationForm idx={num + 1} key={num + 1} />
      ))}
      <Grid item xs={12}>
        <Button onClick={AddEducation}>
          <AddIcon />
          <Typography fontWeight="bold" fontFamily="inherit">
            Add Education
          </Typography>
        </Button>
        {numEducation !== 0 && (
          <Button onClick={DeleteEducation} sx={{ float: "right" }}>
            <Typography fontWeight="bold" fontFamily="inherit">
              Delete Education
            </Typography>
          </Button>
        )}
      </Grid>
    </>
  );
};

const EducationForm = ({ idx }) => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);

  const GetNewInfo = (name, value) => {
    setAllInfo((prev) => {
      let newInfo = prev.Education;
      newInfo[idx][name] = value;
      return { ...prev, Education: newInfo };
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="school"
          label="School"
          id={`school_${idx}`}
          autoComplete="school"
          value={allInfo.Education ? allInfo?.Education[idx]?.School : ""}
          onChange={(e) => GetNewInfo("School", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="location"
          label="Location"
          id={`school_location_${idx}`}
          autoComplete="location"
          value={allInfo.Education ? allInfo?.Education[idx]?.Location : ""}
          onChange={(e) => GetNewInfo("Location", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          name="degree"
          label="Degree"
          id={`degree_${idx}`}
          autoComplete="degree"
          value={allInfo.Education ? allInfo?.Education[idx]?.Degree : ""}
          onChange={(e) => GetNewInfo("Degree", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="major"
          required
          label="Major"
          id={`major_${idx}`}
          autoComplete="major"
          fullWidth
          value={allInfo.Education ? allInfo?.Education[idx]?.Major : ""}
          onChange={(e) => GetNewInfo("Major", e.target.value)}
        />
      </Grid>
      <PickDate
        start={allInfo.Education ? allInfo?.Education[idx]?.Start : new Date()}
        end={allInfo.Education ? allInfo?.Education[idx]?.End : new Date()}
        present={allInfo.Education ? allInfo?.Education[idx]?.Present : false}
        setValue={GetNewInfo}
      />
      <Grid item xs={12}>
        <TextField
          id={`des_${idx}`}
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={allInfo.Education ? allInfo?.Education[idx]?.Description : ""}
          onChange={(e) => GetNewInfo("Description", e.target.value)}
        />
      </Grid>
    </>
  );
};

export default Education;
