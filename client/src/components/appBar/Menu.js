import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from "@mui/icons-material/Article";
import Logo from "../../asset/logo.svg";

const Menu = (props) => {
  return (
    <div className={props.className}>
      {props.isDrawer && <img src={Logo} alt="logo" width="170px" />}
      <NavLink
        to="/"
        exact
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
