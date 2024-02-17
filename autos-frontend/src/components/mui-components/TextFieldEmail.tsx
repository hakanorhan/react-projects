import React, { useState } from 'react';

/* Material UI */
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import { useDispatch } from 'react-redux';
import * as SignInReducers  from '../../redux/features/signinFormularSlice.js';
import * as SignUpReducers from '../../redux/features/signupFormularSlice.js'; 
import { IUseForm } from '../../interfaces/IUseForm.js';
import * as ReduxHelper from '../../helper/reduxHelper.js';
import { FieldId } from '../../constants/FieldIds.js'

const TextFieldSignIn: React.FC<IUseForm> = ({ id, htmlForString, label }) => {

  const dispatch = useDispatch();

  // Check icon
  const [emailMatch, setEmailMatch] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // sets the value. If the use clicks on the submit button, email will be checked for validation.
    const value = event.target.value;

    switch (id) {
      case FieldId.SIGNUP_TEXTFIELD_EMAIL: {
        dispatch(SignUpReducers.setValuesEmail(value));
        // if formular is valid.
        const tempEmailIsValid = ReduxHelper.formularEmailValid(value);
        dispatch(SignUpReducers.setIsValidEmail(tempEmailIsValid));
        setEmailMatch(tempEmailIsValid);
        break;
      }
      case FieldId.SIGNIN_TEXTFIELD_EMAIL: {
        dispatch(SignInReducers.setValuesEmail(value));
        // if formular is valid.
        const tempEmailIsValid = ReduxHelper.formularEmailValid(value);
        dispatch(SignInReducers.setIsValidEmail(tempEmailIsValid));
        setEmailMatch(tempEmailIsValid);
        break;
      }
    }

}
  return (<>
    <div>
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '0.5rem' }}>
        <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
        <OutlinedInput
          onChange={handleOnChange}
          id={id}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled
                aria-label="check visibility"
              >
                {emailMatch ? <CheckIcon /> : ""}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>

      {/* <p style={{ color: textFieldEmail.regexMessage[0].color, textAlign: 'left', marginBottom:'1rem' }}> {errorMessage} &nbsp;</p> */}
    </div>
  </>
  )
}

export default TextFieldSignIn;