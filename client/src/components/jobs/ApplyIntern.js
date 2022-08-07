import React from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import FormHead from "../UI/FormHead";
import { Box } from "@mui/system";
import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import TitleWithIcon from "../UI/TitleWithIcon";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState, useContext, useEffect } from "react";
import apply from "../../asset/apply.png";
import { getInternship, postNewApply } from "../../api/internship-api";
import { UserContext } from "../../store/UserContext";
import _ from "lodash";

const question = [
  "Lorem ipsum dolorf sit amet, consectetur adipiscing elit?",
  "Lorem ipsum dolorf sit amet, consectetur adipiscing elit?",
];
const center = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const ApplyIntern = () => {
  const history = useHistory();
  const { search } = useLocation();
  const info = queryString.parse(search);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const company = info.company;

  return (
    <>
      {isSubmitted ? (
        <Box
          sx={{
            ...center,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "60vh",
            gap: "40px",
            textAlign: "center",
          }}
        >
          <img src={apply} alt="success" width="450px" />
          <Typography variant="h5" fontWeight="800">
            Thanks for applying {company} !
          </Typography>
          <Button variant="contained" onClick={() => history.push("/")}>
            Go to Homepage
          </Button>
        </Box>
      ) : (
        <ApplyForm setIsSubmitted={setIsSubmitted} />
      )}
    </>
  );
};

const ApplyForm = ({ setIsSubmitted }) => {
  const { search, state } = useLocation();
  const info = queryString.parse(search);
  // const job_id = info.id;
  const job_name = "Apply " + info.name.replace(/-/g, " ");
  const company = info.company;
  const avatar = state?.state.avatar || "";
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [questions, setQuestions] = useState(null);

  const { user } = useContext(UserContext);

  const answers = [];
  console.log(answers);

  console.log(resume);
  console.log(coverLetter);

  useEffect(() => {
    const getInternshipInfo = async () => {
      const res = await getInternship(info.id, user.token);
      console.log(res);
      setQuestions(res.questions.map((i) => i.content));
    };
    getInternshipInfo();
  }, []);

  const submitHandler = async () => {
    const QApairs = Object.assign.apply(
      {},
      questions.map((v, i) => ({ [v]: answers[i] }))
    );
    console.log(resume)
    const resumeReader = new FileReader();
    const cvReader = new FileReader();
    resumeReader.onload = () => {
      const base64String = resumeReader.result;
      setResume(base64String);
    };
    cvReader.onload = () => {
      const base64String = cvReader.result;
      setCoverLetter(base64String);
    };
    resumeReader.readAsDataURL(resume);
    cvReader.readAsDataURL(coverLetter);
    await postNewApply(info.id, {
      resume: resume,
      coverLetter: coverLetter,
      interviewQuestion: QApairs,
    });
    //setIsSubmitted(true);
  };

  const answerChangeHandler = (i) => (e) => {
    answers[i] = e.target.value;
  };

  return (
    <Box
      sx={{
        ...center,
        flexDirection: "column",
      }}
    >
      <FormHead title={job_name} company_name={company} avatar={avatar} />
      <Box
        sx={{
          ...center,
          width: "70%",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: "60px",
        }}
      >
        <UploadFile name="Resume" setFile={setResume} />
        <Typography variant="subtitle2" sx={{ color: "#c1c1c1" }}>
          No resume? Click <a href="/">here</a> !
        </Typography>
        <UploadFile name="Cover Letter" setFile={setCoverLetter} />
        <Grid container spacing={5} mt="50px">
          <Grid item md={6} xs={12}>
            <TextField
              id="First Name"
              label="First Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="Last Name"
              label="Last Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField id="Email" label="Email" variant="outlined" fullWidth />
          </Grid>
        </Grid>
        <TitleWithIcon
          icon={<QuizIcon color="primary" />}
          text="Questions"
          mt="100px"
        />
        {questions?.map((q, i) => (
          <Box key={`q_${i}`} mb="40px" sx={{ width: "100%" }}>
            <Typography variant="h7">{q}</Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              value={answers[i]}
              onChange={answerChangeHandler(i)}
              defaultValue=""
              sx={{ mt: "20px" }}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          fullWidth
          sx={{ my: "100px" }}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const UploadFile = ({ name, setFile }) => {
  return (
    <Box
      sx={{
        ...center,
        width: "100%",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h6">{name}: </Typography>
      <label htmlFor={name}>
        <Input
          accept="image/*"
          id={name}
          multiple
          type="file"
          sx={{ display: "none" }}
        />
        <Button
          variant="contained"
          component="span"
          sx={{ width: "28vw" }}
          onChange={(e) => setFile(e.target.files[0])}
        >
          Upload
        </Button>
      </label>
    </Box>
  );
};

export default ApplyIntern;
