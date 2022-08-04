import React, { useContext } from "react";
import { ResumeInfoContext } from "../../store/ResumeInfoContext";

const GenerateResume = () => {
  const { allInfo } = useContext(ResumeInfoContext);
  console.log("🚀 ~ allInfo", allInfo);

  return <div>GenerateResume</div>;
};

export default GenerateResume;
