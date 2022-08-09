import React from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import FormHead from "../UI/FormHead";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  Input,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import TitleWithIcon from "../UI/TitleWithIcon";
import QuizIcon from "@mui/icons-material/Quiz";
import { useState, useContext, useEffect } from "react";
import apply from "../../asset/apply.png";
import { getInternship, postNewApply } from "../../api/internship-api";
import { UserContext } from "../../store/UserContext";
import ErrorMessage from "../UI/ErrorMessage";

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
  const job_name = "Apply " + info.name.replace(/-/g, " ");
  const company = info.company;
  const avatar = state?.state.avatar || "";
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  // Error prompt
  const [errorModalState, setErrorModalState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleOpen = (msg) => {
    setErrorMessage(msg);
    setErrorModalState(true);
  };
  const handleClose = () => setErrorModalState(false);

  const { user } = useContext(UserContext);

  const answers = [];

  useEffect(() => {
    const getInternshipInfo = async () => {
      const res = await getInternship(info.id, user.token);
      console.log(res);
      setQuestions(res.questions);
    };
    getInternshipInfo();
  }, [info.id, user.token]);

  function getBase64(file) {
    var reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (ev) => {
        resolve(ev.target.result);
      };
      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  const submitHandler = async () => {
    const QApairs = questions.map((q, i) => ({
      question_id: q.question_id,
      answer: answers[i],
    }));

    if (resume === null && coverLetter === null) {
      handleOpen("Please Submit a resume and/or cover letter");
    } else {
      setLoading(true);
      const resumeBase64 = await getBase64(resume);
      const coverBase64 = await getBase64(coverLetter);
      const res = await postNewApply(
        info.id,
        {
          resume: resumeBase64,
          coverletter: coverBase64,
          interview_question: QApairs,
        },
        user.token
      );
      const resObject = JSON.parse(res);
      if (resObject.msg === "sucessfully") {
        setIsSubmitted(true);
        setLoading(false);
      } else {
        console.log(resObject);
        handleOpen(resObject);
        setLoading(false);
      }
    }
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
      <Modal
        open={errorModalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ErrorMessage errorTitle={"Error"} errorMessage={errorMessage} />
      </Modal>
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
          No resume? Click <a href="/resume-creator">here</a> !
        </Typography>
        {resume && (
          <Typography color="primary">Resume Successfully Uploaded</Typography>
        )}
        <UploadFile name="Cover Letter" setFile={setCoverLetter} />
        <Typography></Typography>
        {coverLetter && (
          <Typography color="primary">
            Cover letter Successfully Uploaded
          </Typography>
        )}
        <Grid container spacing={0} mt="auto"></Grid>
        {questions && questions.length !== 0 && (
          <TitleWithIcon
            icon={<QuizIcon color="primary" />}
            text="Questions"
            mt="100px"
          />
        )}
        {questions?.map((q, i) => (
          <Box key={`q_${i}`} mb="40px" sx={{ width: "100%" }}>
            <Typography variant="h7">{q.content}</Typography>
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
          disabled={loading}
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
          type="file"
          sx={{ display: "none" }}
          onChange={(e) => {
            const input = document.getElementById(name);
            if (input.files) {
              setFile(input.files[0]);
            }
          }}
        />
        <Button variant="contained" component="span" sx={{ width: "28vw" }}>
          Upload
        </Button>
      </label>
    </Box>
  );
};

export default ApplyIntern;
