import React from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost } from "../../api/forum-api";
import { useHistory } from "react-router-dom";

const EditAndDelete = ({ id, token, industry }) => {
  console.log("🚀 ~ industry", industry);
  const ind = industry;
  const history = useHistory();

  // const onEditClick = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   onEdit();
  // }

  const onDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await deletePost(id, token);
    history.push(`/forum/${ind}`);
  };

  return (
    <Box>
      {/* <IconButton color="primary" onClick={onEditClick}>
        <EditIcon />
      </IconButton> */}
      <IconButton color="error" onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default EditAndDelete;
