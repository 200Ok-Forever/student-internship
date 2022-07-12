import React from "react";
import { Chip, Box, Typography, Button, Popover } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

const localizer = momentLocalizer(moment);
const events = [
  {
    start: moment().toDate(),
    end: moment().toDate(),
    title: "Google Software Engineering Internship",
    type: "internship",
  },
  {
    start: moment().add(4, "days").toDate(),
    end: moment().add(4, "days").add(10, "minutes").toDate(),
    title: "INTERCHANGE interview",
    type: "meeting",
  },
];

const CalendarScreen = () => {
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
          event: Event,
        }}
        style={{ height: "80vh", marginTop: "2em" }}
      />
    </Box>
  );
};

const Event = ({ event }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <Typography variant="h6">{event.title}</Typography>
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
          <EventTime event={event} />
          <Box sx={{ pt: 3 }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              size="small"
              startIcon={event.type === 'internship' ? <RemoveRedEyeIcon /> : <VideoCameraFrontIcon />}
            >
              {event.type === 'internship' ? 'View' : 'Join'}
            </Button>
            <Button
              variant="outlined"
              color="greyColor"
              startIcon={<DeleteIcon />}
              size="small"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

const EventTime = ({ event }) => (
  <Typography variant="subtitle1" component="span">
    {moment(event.start).format("hh:mm a")}
    {(event.start.toDateString() !== event.end.toDateString() ||
      event.start.toTimeString() !== event.end.toTimeString()) && (
      <> - {moment(event.end).format("hh:mm a")}</>
    )}
  </Typography>
);

export default CalendarScreen;
