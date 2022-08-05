import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const PickDate = ({ start, end, setValue }) => {
  const [untiilNow, setUntiilNow] = useState(false);

  useEffect(() => {
    if (untiilNow) {
      setValue("End", new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [untiilNow]);

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
            disabled={untiilNow}
          />
        </LocalizationProvider>
        <FormControlLabel
          control={
            <Checkbox
              checked={untiilNow}
              onChange={() => setUntiilNow((prev) => !prev)}
            />
          }
          label="Currently work there"
        />
      </Grid>
    </>
  );
};

export default PickDate;
