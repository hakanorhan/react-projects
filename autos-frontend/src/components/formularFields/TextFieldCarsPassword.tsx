import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldCarsPassword1: React.FC<IUseForm2> = ({ id, label, onChange, regex }) => {

     // Check icon
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  // Show password
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
    setIsEmpty(value.length === 0);
    setPasswordMatch(regex.test(value));
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl  variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
      id= {id}
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
      label= { label }
    />
  </FormControl>
  )
}

export default TextFieldCarsPassword1;
