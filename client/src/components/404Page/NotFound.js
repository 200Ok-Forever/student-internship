import { Button } from "@mui/material";
import React from "react";
import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <img
        src="https://i.imgur.com/Q2BAOd2.png"
        alt="404 not found"
        width="400px"
      />
      <h1>OOPS! PAGE NOT FOUND!</h1>
      <Button variant="outlined" color="primary">
        Go to homepage
      </Button>
    </div>
  );
};

export default NotFound;
