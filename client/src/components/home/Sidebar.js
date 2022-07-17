import React from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  Link,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import RemoveButton from "../UI/RemoveButton";

const Sidebar = () => {
  // TODO fix when user setup
  const user = 'student';

  const events = [
    {
      start: moment().add(1, "d").toDate(),
      end: moment().add(1, "d").toDate(),
      title: "Google Software Engineering Internship",
      type: "internship",
    },
    {
      start: moment().add(1, "days").toDate(),
      end: moment().add(4, "days").add(2, "days").toDate(),
      title: "Interview with Ashley Zimmer",
      type: "meeting",
    },
    {
      start: moment().add(1, "d").toDate(),
      end: moment().add(1, "d").toDate(),
      title: "Google Software Engineering Internship",
      type: "internship",
    },
    {
      start: moment().add(2, "days").add(15, 'm').toDate(),
      end: moment().add(2, "days").add(2, "hours").toDate(),
      title: "Interview with Jacob Li",
      type: "meeting",
    },
  ];

  // events in the next week
  const upcomingEvents = events
    .filter((e) => moment(e.start).isBetween(moment(), moment().add(7, "d")))
    .sort((a, b) => a.start - b.start);

  return (
    <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
      <Typography variant="h5" component="div" gutterBottom fontWeight={700}>
        My Upcoming Events
      </Typography>
      <Link component={RouteLink} to="/calendar" color="primary">
        View Full Calendar
      </Link>
      <Meetings events={upcomingEvents.filter((e) => e.type === "meeting")} />
      {user === 'student' && 
        <Internships
          events={upcomingEvents.filter((e) => e.type === "internship")}
        />
      }
    </Grid>
  );
};

const Internships = ({ events }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="div" gutterBottom fontWeight={700}>
        Application Deadlines
      </Typography>
      {events.length === 0 ? (
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <i>No application deadlines in the next week</i>
        </Typography>
      ) : (
        events.map((e, i) => (
          <Card sx={{ mt: 1 }} key={`view_${i}`}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {e.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {moment(e.start).calendar()} ({moment(e.start).fromNow()})
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  size="small"
                  startIcon={<RemoveRedEyeIcon />}
                >
                  view
                </Button>
                <RemoveButton />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

const Meetings = ({ events }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="div" fontWeight={700}>
        Meetings
      </Typography>
      {events.length === 0 ? (
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <i>No meetings in the next week</i>
        </Typography>
      ) : (
        events.map((e, i) => (
          <Card sx={{ mt: 1 }} key={`event_${i}`}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {e.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {moment(e.start).calendar()} ({moment(e.start).fromNow()})
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  size="small"
                  startIcon={<VideoCameraFrontIcon />}
                >
                  Join
                </Button>
                <RemoveButton />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Sidebar;
