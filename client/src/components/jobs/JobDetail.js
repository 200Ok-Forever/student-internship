import { Button, Grid, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
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
import salary from "../../asset/salary.png";
import TitleWithIcon from "../UI/TitleWithIcon";
import SchoolIcon from "@mui/icons-material/School";
import YoutubeEmbed from "./YoutubeEmbed";
import ScrollableRow from "../UI/ScrollableRow";
import ChatIcon from "@mui/icons-material/Chat";
import ShowCmts from "../UI/ShowCmts";

const DATA = {
  closed_date: "10/10/2022",
  posted_date: "03/03/2022",
  saved: false,
  recruiting_processes: [
    "Phone Interview",
    "Coding Test",
    "Technical Interview",
  ],
  min_salary: "$12",
  max_salary: "$40",
  salary_currency: "Au",
  company_name: "Google",
  company_avatar: "https://img.icons8.com/officel/344/google-logo.png",
  remote: true,
  job_type: "Full-time",
  city: "Sydney",
  title: "Software engineer intern",
  description:
    "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. Sed efficitur ligula et ante lacinia, quis pulvinar massa eleifend. Duis interdum ornare nunc, ac tincidunt diam rhoncus non. Vestibulum tincidunt tellus rutrum quam gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris viverra erat et enim efficitur porta. In hac habitasse platea dictumst. In at erat quis mi accumsan fringilla sit amet eu mi. Phasellus dignissim leo eros, sed rhoncus est vestibulum nec. \n Ut congue, purus sit amet porttitor pellentesque, ex diam pellentesque mi, ac scelerisque nibh dui eu neque. In finibus, eros sit amet consectetur sagittis, arcu orci semper tortor, sit amet blandit est purus ut turpis. Aliquam quis diam ornare, pharetra metus eget, finibus neque. Sed nec mauris id tortor tempus efficitur a cursus nibh. Donec a sollicitudin augue. Mauris auctor nibh ut molestie semper. Praesent felis orci, rhoncus quis pulvinar a, bibendum non lectus. \n Nunc vehicula pulvinar lorem suscipit malesuada. Donec malesuada velit massa, eget ullamcorper ligula convallis nec. Aenean ac mollis elit. Pellentesque ut ultricies velit. Nam quis posuere orci. Etiam nibh sem, venenatis a rutrum id, condimentum non velit. Mauris at tincidunt mauris. Phasellus viverra est a arcu facilisis, ac auctor elit egestas. Quisque eget risus condimentum, molestie leo vel, venenatis nunc. In hac habitasse platea dictumst. Morbi quis dui non metus ultricies aliquam. Vestibulum ornare, sapien ut vehicula ornare, nibh nunc porta magna, eget accumsan ipsum enim eget est. Donec et ligula ac arcu lobortis finibus sit amet lobortis felis.\n",
  related_courses: [
    "5fb2aPlgoys",
    "ua-CiDNNj30",
    "rfscVS0vtbw",
    "grEKMHGYyns",
    "5fb2aPlgoys",
  ],
  comments: [
    {
      cmtId: "1",
      text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. ",
      avatar:
        "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
      username: "cmt_user1",
      reply: [
        {
          text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit, Lorem ipsum dolorf sit amet, consectetur adipiscing elit , Lorem ipsum dolorf sit amet, consectetur adipiscing elit  ",
          avatar:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
          username: "reply1",
        },
      ],
    },
    {
      cmtId: "2",
      text: "Lorem ipsum dolorf sit amet, consectetur adipiscing elit. Etiam sit amet erat id est consequat fermentum. ",
      avatar:
        "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
      username: "cmt_user2",
      reply: [],
    },
  ],
};

const JobDetail = () => {
  // const history = useHistory();
  const [info, setInfo] = useState([]);
  // console.log(info.comments);
  useEffect(() => {
    setInfo(DATA);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "50px",
        mb: "30px",
      }}
    >
      <BasicInfo info={info} />
      <RelatedCourses info={info} />
      <Comments list={info.comments} />
    </Box>
  );
};

const BasicInfo = ({ info }) => {
  const [saved, setSaved] = useState(false);
  const [shareBar, setShareBar] = useState(false);

  useEffect(() => {
    setSaved(DATA.saved);
  }, []);
  const saveJobHandler = () => {
    setSaved((prev) => !prev);
  };

  const saveBtns = !saved ? (
    <BookmarkBorderIcon color="primary" onClick={saveJobHandler} />
  ) : (
    <BookmarkIcon color="primary" onClick={saveJobHandler} />
  );

  const handleSharedBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShareBar(false);
  };

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
          title: info.title,
          com_name: info.company_name,
          city: info.city,
          avatar: info.company_avatar,
        }}
        save={saveBtns}
      />
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<SendIcon />} size="small">
          Apply now
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareBar(true);
          }}
        >
          Share
        </Button>
        <Snackbar
          open={shareBar}
          autoHideDuration={2000}
          onClose={handleSharedBarClose}
          message="🎉 Copied link to clipboard"
        />
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
        {info?.min_salary && (
          <Label text={info.min_salary + " - " + info.max_salary}>
            <img src={salary} alt="salary" width="25px" height="25px" />
          </Label>
        )}
        <Label text={info.job_type} />
        {info.remote && <Label text="Remote" />}
      </Box>
      <Grid container spacing={8}>
        <Grid item md={12} lg={9} sm={12}>
          <Typography variant="body1" fontFamily={"inherit"}>
            {info.description}
            {info.description}
          </Typography>
        </Grid>
        <Grid
          item
          md={12}
          lg={3}
          sm={12}
          sx={{
            height: "auto",
            p: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TitleWithIcon
            icon={<WorkOutlineIcon size="small" color="primary" />}
            text="Recruiting Processes"
            mb="30px"
          />
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

const RelatedCourses = ({ info }) => {
  return (
    <>
      <TitleWithIcon
        icon={<SchoolIcon size="small" color="primary" />}
        text="Related Courses"
      />
      <ScrollableRow>
        {info?.related_courses?.map((vId, i) => (
          <YoutubeEmbed
            link={`https://www.youtube.com/embed/${vId}`}
            key={`video_${i}`}
          />
        ))}
      </ScrollableRow>
    </>
  );
};

const Comments = ({ list }) => {
  const [comments, setComments] = useState(list);
  console.log(comments);
  useEffect(() => {
    setComments(list);
  }, [list]);

  return (
    <>
      <TitleWithIcon
        icon={<ChatIcon size="small" color="primary" />}
        text="Comments"
        mt="50px"
      />
      <ShowCmts list={comments} setComments={setComments} />
    </>
  );
};

export default JobDetail;
