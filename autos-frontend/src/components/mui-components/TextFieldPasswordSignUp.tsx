import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { IUseForm } from '../../interfaces/IUseForm.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import { REGEX_PASSWORD } from '../../../../autos-backend/src/regex/Regex.js';
import { textFieldPassword } from '../../validation/PasswordValidationMessages.js';
import { IMessageRegex } from '../../interfaces/ITextFieldProps.js';
import { setValuePassword } from '../../redux/features/signupFormularSlice.js';


const TextFieldPassword: React.FC<IUseForm> = ({ id, htmlForString, label }) => {

  // --------------------------------------------------------
  // Password
  // --------------------------------------------------------
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [passwordMatch, setPasswordMatch] = useState(false);

  const dispatch = useDispatch();

  const [password1, setPassword1] = useState("");

  const [useIMessageRegex, setUseIMessageRegex] = useState(textFieldPassword.regexMessage)
  const [useValid, setUseValid] = useState(textFieldPassword.passwordValid);
  let newArray = [... useIMessageRegex];
  // Change color and match value
  const handleChangeIMessageRegex = (index: number, color: string, match: number) => { 
    

    // Get value which have to be changed
    const arrayValue: IMessageRegex = {
      color: color,
      match: match,
      pattern: useIMessageRegex[index].pattern,
      message: useIMessageRegex[index].message
    }

    // store changed value again in element
    newArray[index] = arrayValue;
    setUseIMessageRegex(newArray);
    console.log(newArray)
  }

  const isSignUp = id === 'passwordSignUp';
  /**
   * This function checks on every changes the value with the regularexpression in the doValidation function.
   * The color from errorMessage can change from black to gold or from gold to black.
   * @param event user has an interaction with the passwordfield
   */
  const handleOnChange = (event: React.ChangeEvent< HTMLInputElement>) => {
    const value = event.target.value;
    setPassword1(value);
    
    if (isSignUp) {
      // if regular expression matches then change color to gold else change the color to black again
      const length: number = useIMessageRegex.length;
      let hasMatch = null;
      // if value matches, the indexMatch incremented by 1. 
      let indexMatch: number = 0;
      for (let i = 0; i < length; i++) {
        console.log(useIMessageRegex[i].pattern)
        hasMatch = value.match(useIMessageRegex[i].pattern);
        if (hasMatch == null) {
          handleChangeIMessageRegex(i, 'black', 0);
        } else {
          handleChangeIMessageRegex(i, 'gold', 1);
          indexMatch++;
        }
      }
      
      // sets the value. If the use clicks on the submit button, email will be checked for validation.
      
      if (indexMatch === length) {
        // Check icon
        setPasswordMatch(true);
        setUseValid(true);
      } else {
        // Prevent any actions if the use clicks on signin or signout button.
        setUseValid(false);
        setPasswordMatch(false);
        
      };
    } else {
      if(value.match(REGEX_PASSWORD)) { 
        setUseValid(true); 
      }
      else { 
        setUseValid(false); 
      }
    }


  }

  const ValidationMessages = () => {
    console.log(useIMessageRegex[0].message + " " + useIMessageRegex[0].color + " " + useIMessageRegex[0].match)
      const Messages = () => {
        return isSignUp ? useIMessageRegex.map(item => <p key={item.message} style={{ color: item.color }}> {item.message} </p>) :  <p> </p> ;
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
          onBlur={() => { dispatch(setValuePassword(password1)); }}
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
