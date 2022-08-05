import React, { useContext, useState, useEffect } from "react";
import { Chip, Box, Typography, Button, Popover } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import RemoveButton from "../UI/RemoveButton";
import { UserContext } from "../auth/UserContext";
import { getInternshipEvents } from "../../api/internship-api";
import { useHistory } from "react-router-dom";
import { postInternshipUncalendar } from "../../api/internship-api";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const { user } = useContext(UserContext)
  const [events, setEvents] = useState([])

  const formatEvents = (events) => (
    events.map(event => ({
      ...event,
      start: moment(event.start, "YYYY-MM-DD hh:mm:ss"),
      end: moment(event.start, "YYYY-MM-DD hh:mm:ss"),
    }))
  )

  useEffect(() => {
    const getEvents = async () => {
      const res = await getInternshipEvents(user.token);
      setEvents(formatEvents(JSON.parse(res)))
    }
    getEvents();
  }, [user.token])

  const onRemove = async (data) => {
    const res = await postInternshipUncalendar(data, user.token);
    setEvents(formatEvents(JSON.parse(res)));
  }

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        My Calendar
      </Typography>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        components={{
          event: (event) => <Event eventWrapper={event} onRemove={(data) => onRemove(data)} />,
        }}
        style={{ height: "80vh", marginTop: "2em" }}
      />
    </Box>
  );
};

const Event = ({ eventWrapper, onRemove }) => {
  const { event } = eventWrapper;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "event" : undefined;

  return (
    <Box>
      <div onClick={handleClick}>
        <Typography variant="subtitle1">{event.title}</Typography>
        <EventTime event={event} />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "300px" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" component="div" sx={{ pb: 2 }}>
            {event.title}
          </Typography>
          <Chip
            label={
              event.type === "internship" ? "Applications Close" : "Meeting"
            }
            sx={{ mb: 1, mr: 1 }}
            color={event.type === "internship" ? "error" : "success"}
          />
          <EventTime event={event} inclDay />
          <Box sx={{ pt: 3 }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              size="small"
              onClick={() => { 
                if (event.type === 'internship') {
                  history.push('/job?id='+event.internship_id)}
                }
              }
              startIcon={
                event.type === "internship" ? (
                  <RemoveRedEyeIcon />
                ) : (
                  <VideoCameraFrontIcon />
                )
              }
            >
              {event.type === "internship" ? "View" : "Join"}
            </Button>
            <RemoveButton onClick={() => {
              if (event.type === 'internship') {
                onRemove({ internshipId: event.internship_id})
              } else {
                onRemove({ id: event.id })
              }
            }} />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

const EventTime = ({ event, inclDay = false }) => (
  <Typography variant="subtitle2" component="span">
    {moment(event.start).format(`${inclDay && "D MMM "}hh:mm a`)}
  </Typography>
);

export default CalendarScreen;
