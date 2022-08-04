import React, { useState, useContext, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import JobBlock from "../jobs/JobBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../auth/UserContext";
import { getSavedInternships, postInternshipUnsave } from "../../api/internship-api";

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const SavedInternships = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const getSaved = async () => {
      const res = await getSavedInternships(user.token);
      setLoading(false);
      setInternships(res.is_save);
    };
    getSaved();
  }, [user.token]);

  const onDelete = async (internship_id) => {
    const res = await postInternshipUnsave(internship_id, user.token);
    setInternships(res.is_save);
  }

  return (
    <Box sx={boxStyling} mb="30px">
      <Typography variant="h4" component="div">
        Saved Internships
      </Typography>
      <Box sx={boxStyling}>
        {loading ? 
          <CircularProgress sx={{ alignSelf: 'center' }} />
        : internships.length === 0 ?
          <Typography>You have not saved any internships yet</Typography>
        : internships.map((i) => (
            <JobBlock job={i} key={i.job_id}>
              <IconButton color="error" onClick={() => onDelete(i.job_id)}>
                <DeleteIcon />
              </IconButton>
            </JobBlock>
          ))}
      </Box>
    </Box>
  );
};

export default SavedInternships;
