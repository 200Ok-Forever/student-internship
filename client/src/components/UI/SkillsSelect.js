import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SKILLS } from '../../constants';

const SkillsSelect = ({ label, value, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="skills"
      options={SKILLS}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      defaultValue={[]}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          value={value}
          label={label}
        />
      )}
    />
  )
}

export default SkillsSelect;