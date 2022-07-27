import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EditAndDelete = () => {
  return (
    <Box>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

export default EditAndDelete;