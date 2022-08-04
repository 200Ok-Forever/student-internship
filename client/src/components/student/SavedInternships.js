import React, { useState, useContext, useEffect } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import JobBlock from "../jobs/JobBlock";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../store/UserContext";
import {
  getSavedInternships,
  postInternshipUnsave,
} from "../../api/internship-api";

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const SavedInternships = () => {
  const { user } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const getSaved = async () => {
      const res = await getSavedInternships(user.token);
      setInternships(res.is_save);
    };
    getSaved();
  }, [user.token]);

  const onDelete = async (internship_id) => {
    const res = await postInternshipUnsave(internship_id, user.token);
    setInternships(res.is_save);
  };

  return (
    <Box sx={boxStyling} mb="30px">
      <Typography variant="h4" component="div">
        Saved Internships
      </Typography>
      <Box sx={boxStyling}>
        {internships.map((i) => (
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
