import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store.js';
import CheckIcon from '@mui/icons-material/Check';
import { IUseForm } from '../../interfaces/IUseForm.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import * as SignUpFormular from '../../redux/features/signupFormularSlice.js';
import * as SignInFormular from '../../redux/features/signinFormularSlice.js';
import * as ReduxHelper from '../../helper/reduxHelper.js';
import { FieldId } from '../../constants/FieldIds.js';


const TextFieldPassword: React.FC<IUseForm> = ({ id, htmlForString, label }) => {
  const dispatch = useDispatch();
  const signUpFormular = useSelector((state: RootState) => state.signupFormular)

  const [showPassword, setShowPassword] = React.useState(false);
  // Check icon
  const [passwordMatch, setPasswordMatch] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * This function checks on every changes the value with the regularexpression in the doValidation function.
   * The color from errorMessage can change from black to gold or from gold to black.
   * @param event user has an interaction with the passwordfield
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = ReduxHelper.formularPasswordValid(value);
    
    

    switch (id) {
      case FieldId.SIGNIN_TEXTFIELD_PASSWORD: {
        dispatch(SignInFormular.setValuePassword(value));
        dispatch(SignInFormular.setIsValidPassword(isValid));

        // Check icon
        setPasswordMatch(isValid);
        break;
      }case FieldId.SIGNUP_TEXTFIELD_PASSWORD: {
        dispatch(SignUpFormular.setValuePassword(value));
        dispatch(SignUpFormular.setIsValidPassword(isValid));
        // Check icon
        setPasswordMatch(isValid);
        break;
      }
      case FieldId.SIGNUP_TEXTFIELD_PASSWORD2: {
        dispatch(SignUpFormular.setValuePassword2(value));
        const matchWithPassword1 = ReduxHelper.password2Valid(signUpFormular.fieldPassword1.value, value);
        dispatch(SignUpFormular.setIsValidPassword2(matchWithPassword1));
        // Check icon
        setPasswordMatch(matchWithPassword1);
        break;
      }
    }
  }

  
  const ValidationMessages = () => {
    const Messages = () => {
      return FieldId.SIGNUP_TEXTFIELD_PASSWORD === id 
        ? ReduxHelper.passwordSpecificValid(signUpFormular.fieldPassword1.value).map(item => <p key={item.message} style={{ color: item.isValid ? "orange" : "black" }}> {item.message} </p>) 
        : <p> </p>;
    }

    return (<>
      <Messages />
    </>)
  } 

  return (
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '0.5rem' }}>
        <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
        <OutlinedInput
          id={id}
          onChange={handleOnChange}
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
