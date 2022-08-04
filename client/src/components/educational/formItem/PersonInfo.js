import { Grid, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ResumeInfoContext } from "../../../store/ResumeInfoContext";

const PersonInfo = () => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);

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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["first_name"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["last_name"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["Email"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["Phone"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["City"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["Personal_Website"] = e.target.value;
              return newInfo;
            })
          }
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
          onChange={(e) =>
            setAllInfo((prev) => {
              let newInfo = { ...prev };
              newInfo["Personal_Info"][1]["LinkedIn"] = e.target.value;
              return newInfo;
            })
          }
        />
      </Grid>
    </>
  );
};

export default PersonInfo;
