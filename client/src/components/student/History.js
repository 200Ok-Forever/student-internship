import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import JobBlock from "../jobs/JobBlock";
import { UserContext } from "../../store/UserContext";
import { getInternshipHistory } from "../../api/internship-api";

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const History = () => {
  const { user } = useContext(UserContext);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      const res = await getInternshipHistory(user.token);
      setLoading(false);
      setInternships(res.is_seen);
    };
    getHistory();
  }, [user.token]);

  return (
    <Box sx={boxStyling} mb="30px">
      <Typography variant="h4" component="div">
        History
      </Typography>
      <Box sx={boxStyling}>
        {loading ?
          <CircularProgress sx={{ alignSelf: 'center' }} />
        : internships.length === 0 ? 
          <Typography>You have not viewed any internships yet</Typography>
        : internships.map((internship, i) => (
          <JobBlock job={internship} key={i} />
        ))}
      </Box>
    </Box>
  );
};

export default History;
