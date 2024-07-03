import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, InputAdornment, IconButton, useTheme, OutlinedInput, Typography } from '@mui/material';
import * as ValidHelper from '../../regex/validHelper';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordSignUp: React.FC<IUseForm2> = ({ label, onChange, regex }) => {
  const theme = useTheme();
     // Check icon
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  // Show password
  const [showPassword, setShowPassword] = useState(false);

  // Password value for validation and check all requirements
  const [passwordValue, setPasswordValue] = useState("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
    if(regex)
      setPasswordMatch(regex.test(value));
    setPasswordValue(value);
    setIsEmpty(value.length === 0);
    ValidationMessages();
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const ValidationMessages = () => {
    return passwordValue 
        ? ValidHelper.passwordSpecificValid(passwordValue).map(item =>  <Typography key={item.message} sx={{ color: item.isValid ? 'success.main' : 'danger.main' }}> {item.message} </Typography>)
        : ValidHelper.passwordSpecificValid("").map(item => <Typography key={item.message} sx={{ color: item.isValid ? 'danger.main' : 'success.main' }}> {item.message} </Typography>)
}

  return (
    <>
    <FormControl required variant="outlined">
    <InputLabel htmlFor={label}>{ label }</InputLabel>
    <OutlinedInput
    name={label}
    inputProps={{ id: label }}
      onChange={handleOnChange}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {passwordMatch ? "" : 
              isEmpty ? "" : ""}
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
      label={label}
    />
  </FormControl>
  <ValidationMessages />
 </>
  )
}

export default PasswordSignUp;
