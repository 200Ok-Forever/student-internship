import { Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";
import ShowExample from "./ShowExample";

const OtherSection = ({ section }) => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const GetNewInfo = (value) => {
    setAllInfo((prev) => {
      let newInfo = { ...prev };
      newInfo[section][1] = value;
      return newInfo;
    });
  };
  const format = "Recommand Format: \n - xxx xxxx \n - xxx xxxx \n   .......";

  return (
    <>
      <Grid item xs={12} sm={6}>
        <Typography
          fontWeight="bold"
          fontFamily="inherit"
          variant="h6"
          sx={{ mt: 2 }}
        >
          {section}
        </Typography>
      </Grid>
      {(section === "Skills" || section === "Summary") && (
        <Grid item xs={12} sm={6}>
          <ShowExample section={section} />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          required
          id={`des_${section}`}
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={allInfo[section] ? allInfo[section][1] : ""}
          onChange={(e) => GetNewInfo(e.target.value)}
          placeholder={format}
        />
      </Grid>
    </>
  );
};

export default OtherSection;
