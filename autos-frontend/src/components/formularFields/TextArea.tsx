import React, { ChangeEvent, useState } from 'react'
import { IUseForm2, IUseFormTextArea } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';

import { secondaryColorLight } from '../../themes/ThemeColor';

const TextFieldArea: React.FC<IUseFormTextArea> = ({ id, label, onChange, placeholder, minRows, maxRows}) => {

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
      }

  return (
    <FormControl fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
    multiline
    minRows={minRows}
    maxRows={maxRows}
    placeholder={placeholder}
      id= {id}
      onChange= { handleOnChange }
      label= {label}
    />
  </FormControl>
  )
}

export default TextFieldArea;