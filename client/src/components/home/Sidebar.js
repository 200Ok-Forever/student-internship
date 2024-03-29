import React, { useEffect, useState, useContext } from "react";
import { STUDENT_ROLE } from "../../constants";
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
import { Link as RouteLink, useHistory } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import RemoveButton from "../UI/RemoveButton";
import { UserContext } from "../../store/UserContext";
import {
  getInternshipEvents,
  postInternshipUncalendar,
} from "../../api/internship-api";
import { getMeetingList } from "../../api/chat-api";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await getInternshipEvents(user.token);
      setEvents(JSON.parse(res));
    };

    const getMeetings = async () => {
      const res = await getMeetingList(user.token);
      setMeetings(res.data.invitations);
    };
    getMeetings();
    getEvents();
  }, [user.token]);

  const onRemove = async (data) => {
    const res = await postInternshipUncalendar(data, user.token);
    setEvents(JSON.parse(res));
  };
  // const upcomingMeetings = () =>
  //   meetings.filter((e) =>
  //     moment(e.start_time, "YYYY-MM-DD hh:mm:ss").isBetween(
  //       moment(),
  //       moment().add(14, "d")
  //     )
  //   );

  // events in the next fortnight
  const upcomingEvents = () =>
    events
      .filter((e) =>
        moment(e.start, "YYYY-MM-DD hh:mm:ss").isBetween(
          moment(),
          moment().add(14, "d")
        )
      )
      .sort((a, b) => a.start - b.start);

  return (
    <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
      <Typography variant="h5" component="div" gutterBottom fontWeight={700}>
        My Upcoming Events
      </Typography>
      <Link component={RouteLink} to="/calendar" color="primary">
        View Full Calendar
      </Link>
      <Meetings events={meetings} />
      {user.role === STUDENT_ROLE && (
        <Internships
          events={upcomingEvents().filter((e) => e.type === "internship")}
          onRemove={onRemove}
        />
      )}
    </Grid>
  );
};

const Internships = ({ events, onRemove }) => {
  const history = useHistory();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="div" gutterBottom fontWeight={700}>
        Application Deadlines
      </Typography>
      {events.length === 0 ? (
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <i>No application deadlines in the next fornight</i>
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
                  onClick={() => history.push("/job?id=" + e.internship_id)}
                >
                  view
                </Button>
                <RemoveButton
                  onClick={() => onRemove({ internshipId: e.internship_id })}
                />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

const Meetings = ({ events, onRemove }) => {
  const { user } = useContext(UserContext);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="div" fontWeight={700}>
        Meetings
      </Typography>
      {events.length === 0 ? (
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          <i>No meetings in the next fornight</i>
        </Typography>
      ) : (
        events.map((e, i) => (
          <Card sx={{ mt: 1 }} key={`event_${i}`}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {user.role === 1 ? e.name : e.first_name + " " + e.last_name}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {moment(e.start_time).calendar()} (
                {moment(e.start_time).fromNow()})
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  size="small"
                  startIcon={<VideoCameraFrontIcon />}
                  onClick={() => window.location.replace(e.zoom_link)}
                >
                  Join
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Sidebar;
