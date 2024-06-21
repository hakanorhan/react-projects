import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, InputAdornment, IconButton, Input } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldCarsPassword1: React.FC<IUseForm2> = ({ label, onChange }) => {

  // Show password
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl required variant="standard">
    <InputLabel htmlFor={ label }>{ label }</InputLabel>
    <Input
      name={ label }
      inputProps={{
        id: label
      }}
      onChange={handlePassword}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
  )
}

export default TextFieldCarsPassword1;
