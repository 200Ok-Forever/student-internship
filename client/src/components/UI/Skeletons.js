import { Skeleton } from "@mui/material";
import React from "react";

const Skeletons = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="268px"
        sx={{ maxWidth: "1200px", borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="268px"
        sx={{ maxWidth: "1200px", borderRadius: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="268px"
        sx={{ maxWidth: "1200px", borderRadius: "10px" }}
      />
    </>
  );
};

export default Skeletons;
