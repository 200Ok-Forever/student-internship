import React from "react";
import { useHistory } from "react-router-dom";

const JobDetail = (props) => {
  const history = useHistory();
  const jobBasicInfo = { ...history.location.state.state };

  console.log(jobBasicInfo);
  return <div>JobDetail</div>;
};

export default JobDetail;
