import React, { useState } from 'react'
import { IUseForm } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'

import * as validHelper from '../../helper/validHelper';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldPassword1: React.FC<IUseForm> = ({ id, label, inputRef: ref }) => {

     // Check icon
  const [passwordMatch, setPasswordMatch] = useState(false);
  // Show password
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    const passwordValue: string | undefined = ref.current?.value;
    if(passwordValue) {setPasswordMatch(validHelper.formularPasswordValid(passwordValue));}
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl  variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
    <OutlinedInput
      id= {id}
      inputRef={ref}
      onChange={handlePassword}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {passwordMatch ? <CheckIcon /> : ""}
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
      label= {label}
    />
  </FormControl>
  )
}

export default TextFieldPassword1;
