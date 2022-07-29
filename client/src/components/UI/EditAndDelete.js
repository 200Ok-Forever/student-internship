import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditAndDelete = ({ onEdit, onDelete }) => {
  const onEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit();
  }

  const onDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete();
  }

  return (
    <Box>
      <IconButton color="primary" onClick={onEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default EditAndDelete;