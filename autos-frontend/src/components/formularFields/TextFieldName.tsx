import React, { useState } from 'react'
import { IUseForm } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import * as validHelper from '../../helper/validHelper';

const TextFieldName: React.FC<IUseForm> = ({ id, label, inputRef: ref }) => {

    const [nameMatch, setNameMatch] = useState(false);

    const handleName = () => {
        const nameValue: string | undefined = ref.current?.value;
        if (nameValue) setNameMatch(validHelper.formularNameValid(nameValue));
      }

  return (
    <FormControl required fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
    <OutlinedInput
      id= {id}
      onChange= {handleName}
      inputRef= {ref}
      label= {label}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {nameMatch ? <CheckIcon /> : ""}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
  )
}

export default TextFieldName;