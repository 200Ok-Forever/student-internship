import { Button, Grid, Snackbar, Typography } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import ShowCmts from "../UI/ShowCmts";
import queryString from "query-string";
import { getJob } from "../../api/search-api";
import getSymbolFromCurrency from "currency-symbol-map";
import { postComment, replyComment } from "../../api/comment-api";
import {
  postInternshipCalendar,
  postInternshipSave,
  postInternshipUncalendar,
  postInternshipUnsave,
} from "../../api/internship-api";
import { UserContext } from "../../store/UserContext";

const JobDetail = () => {
  const [info, setInfo] = useState([]);
  const { search } = useLocation();
  const query = queryString.parse(search);
  const id = query.id;
  const [load, setLoad] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const resp = await getJob(id, user.uid);
      if (resp.status === 200) {
        setInfo(resp.data);
        setLoad(false);
      }
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [id, user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "50px",
        mb: "30px",
      }}
    >
      {!load && (
        <>
          <BasicInfo info={info} />
          {info.video_id.length !== 0 && <RelatedCourses ids={info.video_id} />}
          <Comments list={info.comment} jobId={id} />
        </>
      )}
    </Box>
  );
};

const BasicInfo = ({ info }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isCalendar, setIsCalendar] = useState(info.is_calendar === "True");
  const [saved, setSaved] = useState(info.is_save === "True");
  const [shareBar, setShareBar] = useState(false);
  const processes =
    info.recruiting_process.length === 0
      ? ["Phone Interview", "Coding Test", "Technical Interview"]
      : info.recruiting_process;

  let salary_str;
  let salary_curr =
    info.salary_currency !== "AUD"
      ? getSymbolFromCurrency(info.salary_currency)
      : "AU$";
  if (info.min_salary && info.max_salary) {
    salary_str =
      salary_curr + info.min_salary + " - " + salary_curr + info.max_salary;
  } else {
    salary_str = salary_curr + info.min_salary || salary_curr + info.max_salary;
  }

  let post_duration;

  if (info.postedDate !== "None" && info.closedDate !== "None") {
    post_duration =
      info.postedDate.split(" ")[0] + " - " + info.closedDate.split(" ")[0];
  } else {
    post_duration =
      info.postedDate.split(" ")[0] || info.closedDate.split(" ")[0];
  }

  const saveJobHandler = (e) => {
    if (saved) {
      postInternshipUnsave(info.internship_id, user.token);
    } else {
      postInternshipSave(info.internship_id, user.token);
    }
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

  const addCalendarHandler = () => {
    if (!isCalendar) {
      postInternshipCalendar(
        {
          name: info.companyName + " - " + info.jobTitle,
          start:
            info.closedDate !== "None"
              ? info.closedDate
              : moment().add(2, "w").format("YYYY-MM-DD hh:mm:ss"),
          type: "internship",
          internshipId: info.internship_id,
        },
        user.token
      );
    } else {
      postInternshipUncalendar(
        { internshipId: info.internship_id },
        user.token
      );
    }
    setIsCalendar(!isCalendar);
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
          title: info.jobTitle,
          com_name: info.companyName,
          city: info.location,
          avatar: info.company_logo,
          id: info.companyId,
        }}
        save={saveBtns}
      />
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          size="small"
          onClick={() =>
            history.push(
              `/apply?id=${info.internship_id}&name=${info.jobTitle.replace(
                / /g,
                "-"
              )}&company=${info.companyName.replace(/ /g, "-")}`,
              {
                state: { avatar: info.company_logo },
              }
            )
          }
        >
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
          onClick={addCalendarHandler}
          color={isCalendar ? "error" : "primary"}
        >
          {isCalendar ? "Remove from Calendar" : "Add to Calendar"}
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
        {(info.postedDate || info.closedDate) && (
          <Label text={post_duration}>
            <AccessTimeIcon
              fontSize="small"
              color="primary"
              sx={{ mr: "5px" }}
            />
          </Label>
        )}
        {(info.min_salary !== 0 || info.max_salary !== 0) && (
          <Label text={salary_str}>
            <img src={salary} alt="salary" width="25px" height="25px" />
          </Label>
        )}
        {info?.jobType && <Label text={info.jobType} />}
        {info.remote === "True" ? (
          <Label text={"Remote"} />
        ) : (
          <>{info.remote === "False" && <Label text={"On-site"} />}</>
        )}
      </Box>
      <Grid container spacing={8}>
        <Grid item md={12} lg={9} sm={12}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
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
            {processes.map((process, i) => (
              <Process
                text={process}
                key={`process_${i}`}
                num={i + 1}
                isLastOne={i + 1 === processes.length}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const RelatedCourses = ({ ids }) => {
  return (
    <>
      <TitleWithIcon
        icon={<SchoolIcon size="small" color="primary" />}
        text="Related Courses"
      />
      <ScrollableRow>
        {ids?.map((vId, i) => (
          <YoutubeEmbed
            link={`https://www.youtube.com/embed/${vId}`}
            key={`video_${i}`}
          />
        ))}
      </ScrollableRow>
    </>
  );
};

const Comments = ({ list, jobId }) => {
  const [comments, setComments] = useState(list);

  useEffect(() => {
    setComments(list);
  }, [list]);

  const sendCmt = async (newCmt) => {
    try {
      const resp = await postComment(jobId, newCmt.uid, newCmt.text);
      if (resp.status === 200) {
        const cmtInfo = {
          text: newCmt.text,
          uid: newCmt.uid,
          time: new Date(),
          replied: [],
          cmtId: JSON.parse(resp.data).comment_id,
        };
        setComments((prev) => [cmtInfo].concat(prev));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendReply = async (cmtId, newReply) => {
    try {
      const resp = await replyComment(
        jobId,
        newReply.uid,
        newReply.text,
        cmtId
      );
      if (resp.status === 200) {
        setComments((prev) => {
          const idx = prev.findIndex((e) => e.cmtId === cmtId);
          const cmt = prev[idx];
          const replyInfo = {
            repliedId: JSON.parse(resp.data).comment_id,
            text: newReply.text,
            time: new Date(),
            uid: newReply.uid,
          };
          if (cmt) {
            const new_replies = [replyInfo].concat(cmt.replied);
            const new_cmt = { ...cmt, replied: new_replies };
            prev.splice(idx, 1, new_cmt);
          }
          return [...prev];
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ShowCmts list={comments} sendCmt={sendCmt} sendReply={sendReply} />;
};

export default JobDetail;
