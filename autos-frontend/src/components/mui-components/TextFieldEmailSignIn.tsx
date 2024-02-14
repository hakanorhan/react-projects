import React, { useState } from 'react';
import { textFieldEmail } from '../../validation/EmailValidationMessage.js';

/* Material UI */
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import { useDispatch } from 'react-redux';
import { setValuesEmail } from '../../redux/features/signinFormularSlice.js';

import { IUseForm } from '../../interfaces/IUseForm.js';

const TextFieldSignIn:React.FC<IUseForm> = ({id, htmlForString, label}) => {
    
    const dispatch = useDispatch();

      const [emailMatch, setEmailMatch] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");

      // using this value in TextFieldEmail, in onBlur set the value in redux
      // For submitting in parent component
      const [emailValue, setEmailValue] = useState("");

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // sets the value. If the use clicks on the submit button, email will be checked for validation.
    const value = event.target.value;
    setEmailValue(value);
    
      const hasMatch = value.match(textFieldEmail.regexMessage[0].pattern);
      console.log(hasMatch + " -> hasMatch");
      if (hasMatch == null) {  
        setEmailMatch(false);
        setErrorMessage(textFieldEmail.regexMessage[0].message);
      } else {
        setEmailMatch(true);
        setErrorMessage("");
      }
    
    }

  return (<>
  <div>
    <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
          <OutlinedInput
            onChange={handleOnChange}
            id={id}
            onBlur={() => { dispatch(setValuesEmail(emailValue)) }}
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
    
        <p style={{ color: textFieldEmail.regexMessage[0].color, textAlign: 'left', marginBottom:'1rem' }}> {errorMessage} &nbsp;</p>
            </div>
  </>
  )
}

export default TextFieldSignIn;