import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import classes from "./NavBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import { Typography } from "@mui/material";

const Menu = (props) => {
  const history = useHistory();

  return (
    <div className={props.className}>
      {props.isDrawer && (
        <Typography
          variant="h6"
          component="div"
          onClick={() => history.push("/")}
        >
          InternHub
        </Typography>
      )}
      <NavLink
        to="/search"
        activeClassName={classes.active}
        className={classes.btn}
      >
        <SearchIcon fontSize="sm" />
        Search Jobs
      </NavLink>
      <NavLink
        to="/forum"
        activeClassName={classes.active}
        className={classes.btn}
      >
        <ForumIcon fontSize="sm" />
        Forum
      </NavLink>
      <NavLink
        to="/resources"
        activeClassName={classes.active}
        className={classes.btn}
      >
        <ArticleIcon fontSize="sm" />
        Resources
      </NavLink>
    </div>
  );
};

export default Menu;
