import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { label, menuItems = [], id} = props;
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
          id={id}
          value={age}
          label={label}
          sx={{ color: 'white' }}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems && menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Input;

Input.propTypes = {
    label: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      })
    ).isRequired,
  };
  
