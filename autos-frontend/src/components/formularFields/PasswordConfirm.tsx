import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseFormPasswordConfirm } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { colorDanger, secondaryColorLight } from '../../themes/ThemeColor';

const PasswordConfirm: React.FC<IUseFormPasswordConfirm> = ({ id, label, onChange, password1, regex }) => {
    
    const [valueMatch, setValueMatch] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    // Show password
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPasswordConfirm(value);
        onChange(value); // Passwortänderung an den Elternkomponenten übergeben
        setIsEmpty(value.length === 0);
      }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    useEffect(() => {
        console.log("Password1 changes!" + password1 + ": confirm " + passwordConfirm);
        // basierend auf gültigem Passwort: Passwort bestätigen
        setValueMatch(regex.test(passwordConfirm) && password1 === passwordConfirm);
    }, [password1, passwordConfirm]);

  return (
    <FormControl required fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
      id= {id}
      onChange= { handleOnChange }
      type={showPassword ? 'text' : 'password'}
      label= {label}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {valueMatch ? <CheckIcon sx={{ color: secondaryColorLight }} /> :
               isEmpty ? "" : <ErrorOutlineIcon sx={{ color: colorDanger }} /> }
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
    />
  </FormControl>
  )
}

export default PasswordConfirm;