import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getSkils } from '../../api/auth-api';

const SkillsSelect = ({ label, value, onChange }) => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const init = async () => {
      const res = await getSkils();
      setSkills(res.skills);
    }
    init();
  }, [])

  return (
    <Autocomplete
      multiple
      id="skills"
      options={skills}
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