import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { COUNTRIES } from '../../constants';

const CountrySelect = ({ label, value, onChange }) => {
  return (
    <Autocomplete
      id="country"
      options={COUNTRIES.map((c, i) => ({ name: c, id: i }))}
      getOptionLabel={(option) => option.name}
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

export default CountrySelect;