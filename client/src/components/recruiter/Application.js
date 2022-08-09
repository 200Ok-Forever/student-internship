import moment from "moment";
import { Status } from "./ApplicationSelector";
import { Link, Button, Avatar, Grid, Box, Typography } from "@mui/material";
import { postForwardApplication, postRejectApplication, postShortlistApplication, postUnshortlistApplication } from "../../api/company-api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../store/UserContext";

const Application = ({ application, setLoading, setApplications, applications, i, setSelectedApp }) => {
  return (
    <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
      {!application ? (
        <Typography>Nothing to display</Typography>
      ) : (
        <>
          <ApplicationHeader application={application} setLoading={setLoading} setApplications={setApplications} applications={applications} i={i} setSelectedApp={setSelectedApp} />
          <Documents application={application} />
          <Questions questions={application.questions} />
        </>
      )}
    </Box>
  );
};

const ApplicationHeader = ({ application, i, setLoading, setApplications, applications, setSelectedApp }) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  
  const onProceed = async () => {
    setLoading(true);
    const res = await postForwardApplication(id, application.applicationId, user.token)
    let newApps = [...applications];
    newApps[i] = res;
    setApplications(newApps)
    setSelectedApp(i)
    setLoading(false);
  }

  const onReject = async () => {
    setLoading(true);
    const res = await postRejectApplication(id, application.applicationId, user.token)
    let newApps = [...applications];
    newApps[i] = res;
    setSelectedApp(i)
    setApplications(newApps)
    setLoading(false);
  }

  const onShortlist = async () => {
    setLoading(true);
    const res = await postShortlistApplication(id, application.applicationId, user.token)
    let newApps = [...applications];
    newApps[i] = res;
    setApplications(newApps)
    setSelectedApp(i)
    setLoading(false);
  }

  const onUnshortlist = async () => {
    setLoading(true);
    const res = await postUnshortlistApplication(id, application.applicationId, user.token)
    let newApps = [...applications];
    newApps[i] = res;
    setSelectedApp(i)
    setApplications(newApps)
    setLoading(false);
  }

  const pending =
    application.status !== "accepted" && application.status !== "rejected";
  
    return (
    <Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={application.avatar}
          sx={{ height: 150, width: 150, mr: 5 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">{application.first_name} {application.last_name}</Typography>
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Status status={application.status} stage={application.stage} />
              {pending && (
                <>
                  <Button size="large" variant="contained" color="success" onClick={onProceed}>
                    Proceed
                  </Button>
                  <Button
                    size="large"
                    variant={application.shortlist ? "outlined" : "contained"}
                    color="warning"
                    onClick={application.shortlist ? onUnshortlist : onShortlist}
                  >
                    {application.shortlist ? "Unshortlist" : "Shortlist"}
                  </Button>
                  <Button size="large" variant="contained" color="error" onClick={onReject}>
                    Reject
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Typography variant="caption">
            Applied {moment(application.applicationTime, "YYYY-MM-DD hh:mm:ss").fromNow()}
          </Typography>
          <Typography variant="subtitle1">{application.university}</Typography>
          <Typography variant="subtitle1" mb={2}>
            {application.degree} {application.major && `(${application.major})`}
          </Typography>
          <Box>
            <Button size="large" variant="outlined" color="primary">
              View Profile
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => {
                window.open(`/chat`, "_blank");
                localStorage.setItem("chat", application.id.toString());
              }}
            >
              Message
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Documents = ({ application }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">Documents</Typography>
      <Grid container mt={3}>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} mb={1}>
            Resume
          </Typography>
          {application.resume?.data ? (
            <Link download={`${application.first_name}_${application.last_name}_resume`} href={application.resume.data}>Download</Link>
          ) : (
            <Typography variant="body1">Not Submitted</Typography>
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} mb={1}>
            Cover Letter
          </Typography>
          {application.coverletter?.data ? (
            <Link download={`${application.first_name}_${application.last_name}_cover_letter`} href={application.coverletter.data}>Download</Link>
          ) : (
            <Typography variant="body1">Not Submitted</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const Questions = ({ questions }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">Application Answers</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
        {Object.entries(questions).map(questionPair => (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {questionPair[0]}
            </Typography>
            <Typography variant="body1">{questionPair[1]}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Application;
