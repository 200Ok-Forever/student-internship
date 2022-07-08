import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import MUICard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Card({
  title,
  subheading,
  media,
  children,
  to,
  width,
}) {
  return (
    <MUICard sx={{ width: width || "350px", margin: "2em 1em" }}>
      <CardActionArea component={RouterLink} to={to}>
        {media && <CardMedia component="img" height="140" image={media} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            {subheading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MUICard>
  );
}
