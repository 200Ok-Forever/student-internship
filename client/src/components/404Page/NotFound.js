import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./NotFound.module.scss";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className={classes.container}>
      <img src="https://i.imgur.com/Q2BAOd2.png" alt="404 not found" />
      <h1>OOPS! PAGE NOT FOUND!</h1>
      <Button variant="contained" onClick={() => history.push("/")}>
        Go to homepage
      </Button>
    </div>
  );
};

export default NotFound;
