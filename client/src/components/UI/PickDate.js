import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const PickDate = ({ start, end, setValue, present }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DesktopDatePicker
            label="Start"
            value={start}
            onChange={(newTime) => {
              setValue("Start", newTime);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
            inputFormat="dd/MM/yyyy"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DesktopDatePicker
            label="End"
            value={end}
            onChange={(newTime) => {
              setValue("End", newTime);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
            inputFormat="dd/MM/yyyy"
            disabled={present}
          />
        </LocalizationProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={present}
              onChange={() => setValue("Present", !present)}
            />
          }
          label="Present"
        />
      </Grid>
    </>
  );
};

export default PickDate;
