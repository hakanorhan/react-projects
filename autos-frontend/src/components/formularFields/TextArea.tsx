import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseFormTextArea } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const TextFieldArea: React.FC<IUseFormTextArea> = ({ id, label, onChange, placeholder, minRows, maxRows, refresh}) => {

    const [value, setValue] = useState("");

    useEffect(() => {
      setValue("")
    },[refresh])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        onChange(value);
      }

  return (
    <FormControl fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
    multiline
    minRows={minRows}
    maxRows={maxRows}
    value={value}
    placeholder={placeholder}
      id= {id}
      onChange= { handleOnChange }
      label= {label}
    />
  </FormControl>
  )
}

export default TextFieldArea;