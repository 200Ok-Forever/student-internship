import React from "react";
import classes from "./Job.module.scss";

const YoutubeEmbed = ({ link }) => {
  return (
    <div className={classes.video}>
      <iframe
        width="853"
        height="480"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        loading="lazy"
      />
    </div>
  );
};

export default YoutubeEmbed;
