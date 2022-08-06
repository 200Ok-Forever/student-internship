import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { RESUME } from "../../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  maxWidth: "1000px",
  maxHeight: "850px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  overflow: "scroll",
};

const guides = {
  education: [
    "List your qualifications in order of most recent – include the month and year of (expected) completion",
    "You can include any notable grades and scholarships received",
    "You can include brief details of relevant research, course-work projects, thesis titles(if you include a complex these title, consider simplifying so that the reader will understand)",
  ],
  experience: [
    "List appropriate titles of headings and order them in terms of relevance(E.g. Relevant experience, relevant projects, additional experience, volunteer/extra-curricular)",
    "List the most recent experiences first with each section",
    "Remove experiences that do not add value and are quite old (e.g. evaluate those >5 years old)",
    "Use achievement statements when writing the content for all your experiences",
  ],
  project: [
    "Same as Experience guideline",
    "If you feel like there is not enough relevant experience to include on your resume, then consider including university projects (e.g. assignments) that utilise the relevant skills and content knowledge of the role in which you are applying. For example, conducting literature reviews, designing tests/prototypes, collecting data, analysing data using certain software, writing reports, and presenting findings are some skills you may have utilised to complete projects related to the position.",
  ],
  skills: ["List your skills related to this job"],
  summary: [
    "3-5 key summary points about your experience and skills that are tailored to the position",
    "Complete this section last as it is a summary of key content from the rest of your resume",
  ],
};

const exp1 = [
  "Promoted financial software that provided summaries and prediction of stock and forex markets",
  "Provided after sales support, guiding clients to improve utilisation and, value-upselling when appropriate",
];
const exp2 = [
  "Liaised with internal and external stakeholder to effectively cost an ongoing project of up to $40K",
  "Re-organised scheduling and increased staffing of contractors; preventing a 2-month delay and $50K loss",
  "Designed drilling equipment prototypes, analysed operational effectiveness, and produced summary reports",
  "Managed on-site safety with the OHS Officer, conducting safety briefings, and contained 3 incidents",
  "Exposed to the complete cycle from drilling, loading minerals, and transport off-site at Cadia-Ridgeway & CMT",
  "Developed positive relationships with colleagues on-site, gained insight into operations and company culture",
];

const proj1 = [
  "Created a self-driving model car to complete a road-course against other teams (12 teams of 8 members)",
  "Conducted a needs analysis and formulated various design options to maximise performance",
  "Researched infrared signal detection and applied technology to read the speed limit signs and respond to road curves",
  "Developed the model prototype and made modifications after testing",
  "Placed 4th/12 (80% grade): the car drove quickly under the speed limit and safely stayed on the road in the final test",
];

const skillsSample = [
  "Proficient Languages: JavaScript, HTML, CSS/SASS, React",
  "Familiar Languages: C++, Java, Python, NodeJS, PostgreSQL, TypeScript",
  "Technologies: Git",
];

const sumSample = [
  "Bachelor of Engineering (Civil) – final year at UNSW with a Distinction average",
  "Completed a 3-month industrial training program with BHP Billiton at multiple mining locations",
  "Conducted mining design using Auto-CAD at BHP and analyses using Mat-Lab in academic projects at UNSW",
  "Effective communication skills applied in sales and customer service roles at Eng-Supplies and Woolworths",
];

const ExampleItem = (props) => (
  <>
    {props?.title && (
      <Typography sx={{ my: 2 }} fontWeight="bold">
        {props.title}
        {props?.subtitle && <br />}
        {props?.subtitle}
      </Typography>
    )}
    <ul>
      {props.texts.map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  </>
);

const ShowExample = ({ section }) => {
  const [open, setOpen] = React.useState(false);

  const education = (
    <>
      <ul>
        {guides["education"].map((text, idx) => (
          <li key={idx}>
            <Typography sx={{ mt: 2 }}>{text}</Typography>
          </li>
        ))}
      </ul>
      <Typography id="title" color="primary" variant="h6" component="h2">
        Example
      </Typography>
      <ExampleItem
        title="Bachelor of Commerce (Finance and Accounting)"
        subtitle="UNSW Sydney"
        texts={[
          "Distinction average | High Distinction average for finance subjects",
        ]}
      />
      <ExampleItem
        title="Higher School Certificate"
        subtitle="Randwick High School"
        texts={["ATAR: 96.10"]}
      />
    </>
  );

  const experience = (
    <>
      <ul>
        {guides["experience"].map((text, idx) => (
          <li key={idx}>
            <Typography sx={{ mt: 2 }}>{text}</Typography>
          </li>
        ))}
      </ul>
      <Typography id="title" color="primary" variant="h6" component="h2">
        Example
      </Typography>
      <ExampleItem
        title="Sales Representative"
        subtitle="Market Guide, Sydney"
        texts={exp1}
      />
      <ExampleItem
        title="Engineer Intern, Summer Undergraduate Program"
        subtitle="BHP Billiton"
        texts={exp2}
      />
    </>
  );

  const project = (
    <>
      <ul>
        {guides["project"].map((text, idx) => (
          <li key={idx}>
            <Typography sx={{ mt: 2 }}>{text}</Typography>
          </li>
        ))}
      </ul>
      <Typography id="title" color="primary" variant="h6" component="h2">
        Example
      </Typography>
      <ExampleItem title="Automated Car Design Course" texts={proj1} />
    </>
  );
  const skills = (
    <>
      <ul>
        {guides["skills"].map((text, idx) => (
          <li key={idx}>
            <Typography sx={{ mt: 2 }}>{text}</Typography>
          </li>
        ))}
      </ul>
      <Typography id="title" color="primary" variant="h6" component="h2">
        Example
      </Typography>
      <ExampleItem texts={skillsSample} />
    </>
  );

  const summary = (
    <>
      <ul>
        {guides["summary"].map((text, idx) => (
          <li key={idx}>
            <Typography sx={{ mt: 2 }}>{text}</Typography>
          </li>
        ))}
      </ul>
      <Typography id="title" color="primary" variant="h6" component="h2">
        Example
      </Typography>
      <ExampleItem texts={sumSample} />
    </>
  );

  return (
    <>
      <Button
        sx={{ float: "right", mt: "20px" }}
        startIcon={<VisibilityIcon />}
        onClick={() => setOpen(true)}
      >
        Show guide
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="title" color="primary" variant="h6" component="h2">
              Guide
            </Typography>
            {section === RESUME[1] && education}
            {section === RESUME[2] && experience}
            {section === RESUME[3] && project}
            {section === RESUME[4] && skills}
            {section === RESUME[5] && summary}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ShowExample;
