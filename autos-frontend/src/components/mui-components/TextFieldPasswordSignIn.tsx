import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { IUseForm } from '../../interfaces/IUseForm.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material'

import { setValuePassword } from '../../redux/features/signinFormularSlice.js';

const TextFieldPassword: React.FC<IUseForm> = ({ id, htmlForString, label }) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const [password1, setPassword1] = useState("");

  /**
   * This function checks on every changes the value with the regularexpression in the doValidation function.
   * The color from errorMessage can change from black to gold or from gold to black.
   * @param event user has an interaction with the passwordfield
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword1(value);
  }

  return (
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '0.5rem' }}>
        <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
        <OutlinedInput
          id={id}
          onChange={handleOnChange}
          onBlur={() => { dispatch(setValuePassword(password1)); }}
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
          label={label}
        />
      </FormControl>

    </div>
  )
}

export default TextFieldPassword