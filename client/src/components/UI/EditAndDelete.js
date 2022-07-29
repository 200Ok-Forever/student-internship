import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditAndDelete = ({ onEdit, onDelete }) => {
  return (
    <Box>
      <IconButton color="primary" onClick={onEdit}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default EditAndDelete;