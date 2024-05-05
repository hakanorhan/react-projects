import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'
import { ValidParagraph, colorDanger } from '../../themes/ThemeColor';
import * as ValidHelper from '../../helper/validHelper';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PasswordSignUp: React.FC<IUseForm2> = ({ id, label, onChange, regex }) => {

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
     
    if (passwordValue) {
        return ValidHelper.passwordSpecificValid(passwordValue).map(item => <ValidParagraph key={item.message}> <Typography sx={{ color: item.isValid ? 'black' : 'primary.light' }}> {item.message} </Typography></ValidParagraph>)

    } else {
        return ValidHelper.passwordSpecificValid("").map(item => <ValidParagraph key={item.message}> <Typography sx={{ color: item.isValid ? 'black' : 'primary.light' }}> {item.message} </Typography> </ValidParagraph>)
    }
}

  return (
    <Box>
    <FormControl  variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
      id= {id}
      onChange={handleOnChange}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {passwordMatch ? <CheckIcon /> : 
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
  <ValidationMessages />
  </Box>
  )
}

export default PasswordSignUp;
