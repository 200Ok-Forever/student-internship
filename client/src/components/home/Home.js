import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import Card from "../UI/Card";
import ScrollableRow from "../UI/ScrollableRow";
import EventsSidebar from "./Sidebar";
import Search from "./Search";
import classes from "./style/home.module.scss";
import wave from "../../asset/wave.svg";

const Home = () => {
  return (
    <Box>
      <SearchBanner />
      <Grid container>
        <Grid item xs={9}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            fontFamily={"inherit"}
            fontWeight={700}
          >
            Recommended for You
          </Typography>
          <ContentRow />
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            fontFamily={"inherit"}
            fontWeight={700}
          >
            Recently Posted
          </Typography>
          <ContentRow />
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            fontFamily={"inherit"}
            fontWeight={700}
          >
            Closing Soon
          </Typography>
          <ContentRow />
        </Grid>
        <EventsSidebar />
      </Grid>
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

// hardcoded for now, will actually come from API
const ContentRow = () => (
  <ScrollableRow>
    <Card
      title="Software Engineering Internship"
      itemId={1}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
    ,
    <Card
      title="Software Engineering Internship"
      itemId={2}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
    ,
    <Card
      title="Software Engineering Internship"
      itemId={3}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
    ,
    <Card
      title="Software Engineering Internship"
      itemId={4}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
    ,
    <Card
      title="Software Engineering Internship"
      itemId={5}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
    ,
    <Card
      title="Software Engineering Internship"
      itemId={6}
      subheading="Google"
      media="https://picsum.photos/300/200"
      to="/forum"
    >
      "some text omg asdjoas idasiudh asiduh asiduhas diuahsd iasuhd aiushdiau
      sdhsaiudh"
    </Card>
  </ScrollableRow>
);
export default Home;
