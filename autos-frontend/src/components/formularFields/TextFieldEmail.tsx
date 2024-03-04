import React, { useState } from 'react'
import { IUseForm } from '../../interfaces/IUseForm'
import { FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'

import * as ValidHelper from '../../helper/validHelper';


const TextFieldEmail: React.FC<IUseForm> = ({ id, label, inputRef: ref }) => {
  
      // Check icon
  const [emailMatch, setEmailMatch] = useState(false);

  const handleEmail  = () => {
    const emailValue:string | undefined = ref.current?.value;
    if(emailValue) setEmailMatch(ValidHelper.formularEmailValid(emailValue));
    }
  

  return (

    <FormControl variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <OutlinedInput
      id= {id}
      inputRef={ref}
      onChange={handleEmail}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
            
          >
            {emailMatch ? <CheckIcon /> : ""}
          </IconButton>
        </InputAdornment>
      }
      label= {label}
    />
  </FormControl>

  )
}

export default TextFieldEmail;