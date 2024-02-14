import React, { useState } from 'react'
import { REGEX_PASSWORD } from '../../../../autos-backend/src/regex/Regex.js';
import { IUseForm } from '../../interfaces/IUseForm.js';

/* Material UI */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

/* Redux */
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux'
import { setValuePassword2 } from '../../redux/features/signupFormularSlice.js';


const TextFieldPassword: React.FC<IUseForm> = ({ id, htmlForString, label }) => {

  // password have to match with the first password
  const [passwordMatch, setPasswordMatch] = useState(false);

  const dispatch = useDispatch();
  const [usePassword2, useSetPassword2] = useState("");

  const password1 = useSelector((state: RootState) => state.signupFormular.valuePassword)

  // show and hide password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * This function checks on every changes the value with the regularexpression in the doValidation function.
   * The color from errorMessage can change from black to gold or from gold to black.
   * @param event user has an interaction with the passwordfield
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    useSetPassword2(value);

    // if password1 matches password2 and password 2 is valid
    (password1 === value && value.match(REGEX_PASSWORD)) ? setPasswordMatch(true) : setPasswordMatch(false);
  }

  const ValidationMessages = () => {

    return (<>
    </>)
  }

  return (
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '0.5rem' }}>
        <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
        <OutlinedInput
          id={id}
          onChange={handleOnChange}
          onBlur={() => { dispatch(setValuePassword2(usePassword2)) }}
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
          label={label}
        />
      </FormControl>
      <ValidationMessages />

    </div>
  )
}

export default TextFieldPassword