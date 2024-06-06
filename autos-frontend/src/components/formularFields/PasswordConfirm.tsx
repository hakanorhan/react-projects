import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseFormPasswordConfirm } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, InputAdornment, IconButton, Input } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Visibility, VisibilityOff } from '@mui/icons-material';

import { colorDanger } from '../../themes/Theme';

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
        // basierend auf gültigem Passwort: Passwort bestätigen
        setValueMatch(regex.test(passwordConfirm) && password1 === passwordConfirm);
    }, [password1, passwordConfirm]);

  return (
    <FormControl required fullWidth variant="standard" >
    <InputLabel htmlFor={ label }>{ label }</InputLabel>
    <Input
      onChange= { handleOnChange }
      type={showPassword ? 'text' : 'password'}
      name={ label }
      inputProps={{ 
        id: label
       }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {valueMatch ? <CheckIcon /> :
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