import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="greyColor"
      startIcon={<DeleteIcon />}
      size="small"
      onClick={onClick}
    >
      Remove
    </Button>
  )
}

export default RemoveButton;