import { Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";

const PersonInfo = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  const GetNewInfo = (name, value) => {
    setAllInfo((prev) => {
      let newInfo = { ...prev };
      newInfo["Personal_Info"][1][name] = value;
      return newInfo;
    });
  };

  return (
    <>
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
          value={
            allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.first_name : ""
          }
          onChange={(e) => GetNewInfo("first_name", e.target.value)}
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
          value={
            allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.last_name : ""
          }
          onChange={(e) => GetNewInfo("last_name", e.target.value)}
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
          value={allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.Email : ""}
          onChange={(e) => GetNewInfo("Email", e.target.value)}
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
          value={allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.Phone : ""}
          onChange={(e) => GetNewInfo("Phone", e.target.value)}
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
          value={allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.City : ""}
          onChange={(e) => GetNewInfo("City", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="personalWebsite"
          label="Personal Website"
          id="personalWebsite"
          autoComplete="personalWebsite"
          value={
            allInfo.Personal_Info
              ? allInfo?.Personal_Info[1]?.Personal_Website
              : ""
          }
          onChange={(e) => GetNewInfo("Personal_Website", e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="linkedIn"
          label="LinkedIn"
          id="linkedIn"
          autoComplete="linkedIn"
          value={
            allInfo.Personal_Info ? allInfo?.Personal_Info[1]?.LinkedIn : ""
          }
          onChange={(e) => GetNewInfo("LinkedIn", e.target.value)}
        />
      </Grid>
    </>
  );
};

export default PersonInfo;
