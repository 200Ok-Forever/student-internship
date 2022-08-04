import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { RESUME } from "../../constants";
import PersonInfo from "./formItem/PersonInfo";
import Education from "./formItem/Education";
import WorkExperience from "./formItem/WorkExperience";
import Projects from "./formItem/Projects";
import { useContext, useEffect } from "react";
import { ResumeInfoContext } from "../../store/ResumeInfoContext";
import { RESUME_DATA } from "../../constants";
import OtherSection from "./formItem/OtherSection";

const ResumeForm = ({ order }) => {
  const { allInfo, setAllInfo } = useContext(ResumeInfoContext);
  // console.log("🚀 ~ allInfo", allInfo);

  useEffect(() => {
    if (!allInfo.haveInfo) {
      order.forEach((section, idx) => {
        if (section === RESUME[0]) {
          setAllInfo((prev) => ({
            ...prev,
            Personal_Info: [idx, RESUME_DATA.Personal_Info],
          }));
        } else if (section === RESUME[1]) {
          setAllInfo((prev) => ({
            ...prev,
            Education: [idx],
          }));
        } else if (section === RESUME[2]) {
          setAllInfo((prev) => ({
            ...prev,
            Work_Experience: [idx],
          }));
        } else if (section === RESUME[3]) {
          setAllInfo((prev) => ({
            ...prev,
            Relavant_Projects: [idx],
          }));
        } else {
          setAllInfo((prev) => {
            let newInfo = { ...prev };
            newInfo[section] = [idx, ""];
            return newInfo;
          });
        }
      });
      setAllInfo((prev) => ({ ...prev, haveInfo: true }));
    }
  }, [order, setAllInfo, allInfo.haveInfo]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={() => {}}
      sx={{
        padding: "36px",
        width: "53vw",
        height: "fit-content",
        mx: "auto",
        mb: "10px",
      }}
    >
      <Grid container spacing={2}>
        {order?.map((section, idx) => {
          if (section === RESUME[0]) {
            return <PersonInfo key={idx} />;
          } else if (section === RESUME[1]) {
            return <Education key={idx} />;
          } else if (section === RESUME[2]) {
            return <WorkExperience key={idx} />;
          } else if (section === RESUME[3]) {
            return <Projects key={idx} />;
          }
          return <OtherSection section={section} key={idx} />;
        })}
      </Grid>
    </Box>
  );
};

export default ResumeForm;
