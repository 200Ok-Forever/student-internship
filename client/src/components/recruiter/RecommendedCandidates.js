import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { UserContext } from "../../store/UserContext";
import { getRecommendations } from "../../api/company-api";
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const RecommendedCandidates = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getStudents = async () => {
      const res = await getRecommendations(id, user.token)
      setLoading(false);
      setStudents(res.result);
      setTitle({ title: res.intern_title, city: res.city });
    }
    getStudents();
  }, [id, user.token])

  return (
    <Box>
      <Typography variant="h4" component="div">
        Recommended Students
      </Typography>
      {title?.title && 
        <Typography variant="h6" component="div" mt={2} mb={5}>
          {title?.title} {title?.city && `(${title.city})`}
        </Typography>
      }
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        {loading ?
          <CircularProgress sx={{ alignSelf: 'center' }} />
        : students.length === 0 ?
          <Typography>There are no students that match your internship requirements</Typography>
        : <>
            <Grid container spacing={10}>
              {students.map((student) => (
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <StudentCard student={student} key={student.id} />
                </Grid>
              ))}
            </Grid>
          </>
        }
      </Box>
    </Box>
  );
};

const StudentCard = ({ student }) => {
  return (
    <Card sx={{ textAlign: "center", padding: "1rem", height: "95%" }}>
      <CardContent
        sx={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar src={student.avatar} sx={{ width: "10rem", height: "10rem" }} />
        <Box>
          <Typography variant="h5">{student.first_name} {student.last_name}</Typography>
          <Typography variant="subtitle1">{student.university}</Typography>
          <Typography variant="subtitle1">{student.degree} {student.major && `(${student.major})`}</Typography>
        </Box>
        <Box>
          {student.match.map((skill) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "green",
                gap: 1,
                fontWeight: "bold",
              }}
            >
              <CheckIcon />
              <Typography variant="subtitle1" color="success">
                {skill}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end" }}>
          <Button color="primary" variant="outlined">
            View Profile
          </Button>
          <Button 
            color="primary" 
            variant="outlined" 
            sx={{ ml: 2 }}
            onClick={() => {
              window.open(`/chat`, "_blank");
              localStorage.setItem("chat", student.id.toString());
            }}
          >
            Message
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecommendedCandidates;
