import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SKILLS } from '../../constants';

const SkillsSelect = ({ label, skills, setSkills }) => {
  return (
    <Autocomplete
      multiple
      id="skills"
      options={SKILLS}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      defaultValue={[]}
      value={skills}
      onChange={(e, value) => setSkills(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
        />
      )}
    />
  )
}

export default SkillsSelect;