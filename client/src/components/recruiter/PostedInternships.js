import React, { useContext, useState, useEffect } from "react";
import { toTitleCase } from '../../helpers';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Button, Paper, Box, Typography } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import RemoveButton from "../UI/RemoveButton";
import salary from "../../asset/salary.png";
import Label from "../UI/Label";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditAndDelete from "../UI/EditAndDelete";
import { UserContext } from "../../store/UserContext";
import { deleteInternship, getPostedInternships } from "../../api/company-api";
import CircularProgress from '@mui/material/CircularProgress';

const boxStyling = { display: "flex", flexDirection: "column", gap: "30px" };

const PostedInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getInternships = async () => {
      const res = await getPostedInternships(user.uid, user.token);
      setLoading(false);
      setInternships(res.jobs);
    }
    getInternships();
  }, [user.token, user.uid])

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="div">
          Manage Your Internship Postings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/job/create"
        >
          New Posting
        </Button>
      </Box>
      <Box sx={boxStyling}>
        {loading ?
          <CircularProgress sx={{ alignSelf: 'center' }} />
        : internships.length === 0 ?
          <Typography>You have not posted any internships yet</Typography>
        : internships.map((i) => (
          <InternshipCard job={i} key={i.job_id} setInternships={setInternships}>
            <RemoveButton />
          </InternshipCard>
        ))}
      </Box>
    </Box>
  );
};

const InternshipCard = ({ job, setInternships }) => {
  const paper = {
    width: "auto",
    p: "20px",
    display: "flex",
    flexDirection: "column",
    rowGap: "14px",
  };

  return (
    <Box>
      <Paper elevation={3} sx={paper}>
        <CardHeader job={job} setInternships={setInternships} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "red",
            gap: "12px",
          }}
        >
          <GroupAddIcon />
          <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
            {job.nApplications} applications
          </Typography>
        </Box>
        <Labels job={job} />
      </Paper>
    </Box>
  );
};

const CardHeader = ({ job, setInternships }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const onDelete = async () => {
    const res = await deleteInternship(job.id, user.token);
    setInternships(res.jobs);
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => history.push(`/job?id=${job.job_id}`)}
        >
          {job.title}
        </Typography>
        <EditAndDelete 
          onEdit={() => history.push({ pathname: `/job/edit`, state: { job: job }})} 
          onDelete={onDelete}
        />
      </Box>
    </>
  );
};

const Labels = ({ job }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", columnGap: "14px", alignItems: "center" }}>
        <Box
          style={{
            display: "flex",
            alignItems: "flex-start",
            columnGap: "3px",
          }}
        >
          <FmdGoodIcon fontSize="small" color="primary" />
          {job.city}
        </Box>
        {(job.min_salary !== 0 || job.max_salary !== 0) && 
          <Label text={`${job.min_salary} - ${job.max_salary} ${job.salary_currency}`}>
            <img src={salary} alt="salary" width="25px" height="25px" />
          </Label>
        }
        <Label text={toTitleCase(job.type)}></Label>
        {job.is_remote && <Label text={"Remote"}></Label>}
      </Box>
      <Box>
        <Button
          component={RouterLink}
          to={`/applications?id=${job.id}`}
          variant="outlined"
        >
          View Applications
        </Button>
        <Button
          component={RouterLink}
          to={`job/${job.id}/recommended-candidates`}
          variant="outlined"
          sx={{ ml: 2 }}
        >
          View Recommended Candidates
        </Button>
      </Box>
    </Box>
  );
};

export default PostedInternships;
