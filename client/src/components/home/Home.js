import React from "react";
import Search from "./Search";
import classes from "./style/home.module.scss";
import wave from "../../asset/wave.svg";

const Home = () => {
  return (
    <div>
      <div className={classes["search-container"]}>
        <div className={classes.box}>
          <div className={classes.typewriter}>
            <h1>Hi! What are you looking for?</h1>
          </div>
          <Search color="primary" className={classes.search} />
        </div>
        <img src={wave} alt="wave" />
      </div>
      <div className={classes["content-container"]}>
        <span>continue..</span>
      </div>
    </div>
  );
};

export default Home;
