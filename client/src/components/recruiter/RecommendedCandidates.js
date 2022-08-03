import React from "react";
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

const students = [
  {
    id: 1,
    name: "James Smith",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    university: "UNSW",
    degree: "Bachelor's in Computer Science",
    matchingSkills: [
      "Interested in Fintech",
      "Java",
      "CI/CD",
      "Google Cloud Platform",
    ],
  },
  {
    id: 1,
    name: "Jane Zheng",
    avatar:
      "https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg",
    university: "UTS",
    degree: "Bachelor's in Game Development",
    matchingSkills: [
      "Penultimate Year",
      "ReactJS",
      "HTML/CSS",
      "Communication",
    ],
  },
  {
    id: 1,
    name: "Patrick Yo",
    avatar:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    university: "ACU",
    degree: "Bachelor's in Computer Science",
    matchingSkills: ["Python", "Java", "GoLang"],
  },
  {
    id: 1,
    name: "Talya Avan",
    avatar:
      "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg    ",
    university: "UNSW",
    degree: "Bachelor's in Computer Engineering",
    matchingSkills: ["1 Year Experience", "Python", "ReactJS"],
  },
];

const RecommendedCandidates = () => {
  return (
    <Box>
      <Typography variant="h4" component="div">
        Recommended Candidates
      </Typography>
      <Typography variant="h6" component="div" mt={2} mb={5}>
        Software Engineering Intern (Sydney)
      </Typography>
      <Grid container spacing={10}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <StudentCard student={student} key={student.id} />
          </Grid>
        ))}
      </Grid>
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
          <Typography variant="h5">{student.name}</Typography>
          <Typography variant="subtitle1">{student.university}</Typography>
          <Typography variant="subtitle1">{student.degree}</Typography>
        </Box>
        <Box>
          {student.matchingSkills.map((skill) => (
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
          <Button color="primary" variant="outlined" sx={{ ml: 2 }}>
            Message
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecommendedCandidates;
