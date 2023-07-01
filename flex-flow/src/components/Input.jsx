import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Input = (props) => {
  const { label } = props;
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '320px', backgroundColor: '#454447', borderRadius: 3 }}>
        <InputLabel sx={{ color: 'white' }} id="demo-simple-select-helper-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label={label}
          sx={{ color: 'white' }}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Input;
