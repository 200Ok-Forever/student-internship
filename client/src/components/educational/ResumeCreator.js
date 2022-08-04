import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import SelectSection from "./SelectSection";
import ResumeForm from "./ResumeForm";

const steps = [
  "Select and order sections",
  "Fill up your infomation",
  "Generate resume",
];

const ResumeCreator = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => setActiveStep(0)}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <SelectSection />}
          {activeStep === 1 && <ResumeForm />}
          {activeStep === 2 && <SelectSection />}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() =>
                setActiveStep((prevActiveStep) => prevActiveStep - 1)
              }
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={() =>
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default ResumeCreator;
