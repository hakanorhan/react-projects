import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { colorDanger, secondaryColorLight } from '../../themes/ThemeColor';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
          <IconButton disabled
            aria-label="check visibility"
          >
            {passwordMatch ? <CheckIcon sx={{ color: secondaryColorLight }} /> : 
              isEmpty ? "" : <ErrorOutlineIcon sx={{ color: colorDanger }} />}
          </IconButton>
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
