import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getIndustries } from '../../api/auth-api';

const IndustrySelect = ({ label, value, onChange }) => {
  const [industries, setIndustries] = useState([])

  useEffect(() => {
    const init = async () => {
      const res = await getIndustries();
      setIndustries(res.industries);
    }
    init();
  }, [])

  return (
    <Autocomplete
      multiple
      id="skills"
      options={industries}
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

export default IndustrySelect;