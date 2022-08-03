import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import JobBlock from "../jobs/JobBlock";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UserContext } from "../auth/UserContext";
import { getInternshipHistory } from "../../api/internship-api";

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const History = () => {
  const { user } = useContext(UserContext);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const res = await getInternshipHistory(user.token);
      setInternships(res.is_seen);
    }
    getHistory();
  }, [user.token])

  return (
    <Box sx={boxStyling} mb="30px">
      <Typography variant="h4" component="div">
        History
      </Typography>
      <Box sx={boxStyling}>
        {internships.map((internship, i) => (
          <JobBlock job={internship} key={i}>
            <IconButton color="primary">
              <BookmarkBorderIcon />
            </IconButton>
            <IconButton color="primary">
              <CalendarMonthIcon />
            </IconButton>
          </JobBlock>
        ))}
      </Box>
    </Box>
  );
};

export default History;
