import React, { useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import EventsSidebar from "./Sidebar";
import Search from "./Search";
import classes from "./style/home.module.scss";
import wave from "../../asset/wave.svg";
import PostedInternships from "../recruiter/PostedInternships";
import RecommendedInternships from "../student/RecommendedInternships";
import { UserContext } from "../../store/UserContext";
import { RECRUITER_ROLE } from "../../constants";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <Box>
      <SearchBanner isRecruiter={user.role === RECRUITER_ROLE} />
      {user.token && (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={9}
            order={{ xs: 2, md: 1 }}
            mt={{ xs: 5, md: 0 }}
          >
            {user.role === 1 ? (
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

const SearchBanner = ({ isRecruiter }) => {
  return (
    isRecruiter ? (
        <div>
          <Box sx={{ mb: 5, p: 5, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#36454F' }}>
            <Typography variant="h4">Search Internships</Typography>
            <Search className={classes.search} noDeco />
          </Box>
        </div>      
    ) : (
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
    )
  )
};

export default Home;
