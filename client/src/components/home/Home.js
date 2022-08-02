import React, { useContext } from "react";
import { Grid, Box } from "@mui/material";
import EventsSidebar from "./Sidebar";
import Search from "./Search";
import classes from "./style/home.module.scss";
import wave from "../../asset/wave.svg";
import PostedInternships from '../recruiter/PostedInternships';
import RecommendedInternships from '../student/RecommendedInternships';
import { UserContext } from "../auth/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <SearchBanner />
      {user.token && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }} mt={{ xs: 5, md: 0 }}>
            {user.role == 1 ? (
              <RecommendedInternships />
            ) : (
              <PostedInternships />
            )}
          </Grid>
          <EventsSidebar />
        </Grid>
      )}
    </Box>
  );
};

const SearchBanner = () => {
  return (
    <div>
      <div className={classes["search-container"]}>
        <div className={classes.box}>
          <div className={classes.typewriter}>
            <h1>Hi! What are you looking for?</h1>
          </div>
          <Search className={classes.search} />
        </div>
        <img src={wave} alt="wave" />
      </div>
      <div className={classes["content-container"]} />
    </div>
  );
};

export default Home;