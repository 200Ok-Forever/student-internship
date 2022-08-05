import React, { useContext } from "react";
import { ResumeInfoContext } from "../../store/ResumeInfoContext";
import { Box, Typography } from "@material-ui/core";
import classes from "./resume.module.scss";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Document } from "@react-pdf/renderer";
import { styles } from "./ResumeStyle";
import { RESUME_UNDERSCORE } from "../../constants";
import {
  EducationItem,
  OtherItem,
  PersonItem,
  ProjItem,
  WorkItem,
} from "./formItem/AllPdfItem";

const GenerateResume = () => {
  const { allInfo } = useContext(ResumeInfoContext);

  const getSortInfo = () => {
    let sortAll = [];
    for (const info in allInfo) {
      sortAll.push([info, allInfo[info]]);
    }
    sortAll.sort((a, b) => a[1][0] - b[1][0]);
    sortAll.shift();
    return sortAll;
  };

  const sortInfo = getSortInfo();

  return (
    <Box
      mt="30px"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography
        variant="h5"
        style={{ fontFamily: "inherit", fontWeight: "700" }}
      >
        👇Hi! Here is your resume!
      </Typography>
      <PDFViewer className={classes["view-resume"]}>
        <ResumeDoc info={sortInfo} />
      </PDFViewer>
    </Box>
  );
};

const ResumeDoc = ({ info }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {info.map((section) => {
          if (section[0] === RESUME_UNDERSCORE[0]) {
            return <PersonItem info={section[1][1]} />;
          } else if (section[0] === RESUME_UNDERSCORE[1]) {
            return <EducationItem listEdu={section[1].slice(1)} />;
          } else if (section[0] === RESUME_UNDERSCORE[2]) {
            return <WorkItem listWork={section[1].slice(1)} />;
          } else if (section[0] === RESUME_UNDERSCORE[3]) {
            return <ProjItem listProj={section[1].slice(1)} />;
          }
          return <OtherItem section={section[0]} description={section[1][1]} />;
        })}
      </Page>
    </Document>
  );
};

export default GenerateResume;
