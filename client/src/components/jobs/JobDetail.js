import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import JobBasicCard from "../UI/JobBasicCard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import Label from "../UI/Label";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Process from "../UI/Process";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const DATA = {
  closed_date: "10/10/2022",
  posted_date: "03/03/2022",
  saved: false,
  recruiting_processes: [
    "Phone Interview",
    "Coding Test",
    "Technical Interview",
  ],
};

const JobDetail = () => {
  const history = useHistory();
  const [info, setInfo] = useState([]);
  const basicInfo = { ...history.location.state.state };
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setInfo(DATA);
    setSaved(DATA.saved);
  }, []);

  const saveJobHandler = () => {
    setSaved((prev) => !prev);
  };

  const save = !saved ? (
    <BookmarkBorderIcon color="primary" onClick={saveJobHandler} />
  ) : (
    <BookmarkIcon color="primary" onClick={saveJobHandler} />
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        mb: "30px",
      }}
    >
      <JobBasicCard
        job={{
          title: basicInfo.title,
          com_name: basicInfo.company_name,
          city: basicInfo.city,
          avatar: basicInfo.company_avatar,
        }}
        save={save}
      />
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<SendIcon />} size="small">
          Apply now
        </Button>
        <Button variant="outlined" startIcon={<ShareIcon />} size="small">
          Share
        </Button>
        <Button
          variant="outlined"
          startIcon={<CalendarMonthIcon />}
          size="small"
        >
          Add to Calendar
        </Button>
        <Button variant="outlined" startIcon={<MailOutlineIcon />} size="small">
          Chat
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mb: "40px",
          flexWrap: "wrap",
        }}
      >
        <Label text={info.posted_date + " - " + info.closed_date}>
          <AccessTimeIcon fontSize="small" color="primary" sx={{ mr: "5px" }} />
        </Label>
        <Label text={basicInfo.job_type} />
        {basicInfo.remote && <Label text="Remote" />}
      </Box>
      <Grid container spacing={8}>
        <Grid item md={12} lg={9}>
          <Typography variant="body1">
            {basicInfo.description}
            {basicInfo.description}
          </Typography>
        </Grid>
        <Grid
          item
          md={12}
          lg={3}
          sx={{
            height: "auto",
            p: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              mb: "40px",
              alignSelf: "flex-start",
            }}
          >
            <WorkOutlineIcon size="small" color="primary" />
            <Typography variant="h6" fontWeight="700" fontFamily="inherit">
              Recruiting Processes
            </Typography>
          </Box>
          <Box>
            {info?.recruiting_processes?.map((process, i) => (
              <Process
                text={process}
                key={`process_${i}`}
                num={i + 1}
                isLastOne={i + 1 === info.recruiting_processes.length}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetail;
