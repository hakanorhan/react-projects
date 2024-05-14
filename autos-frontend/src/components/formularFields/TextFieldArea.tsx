import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseFormTextArea } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const TextFieldArea: React.FC<IUseFormTextArea> = ({ padding, id, label, onChange, placeholder, minRows, maxRows, refresh, disbled, areaText }) => {

    const [value, setValue] = useState("");

    useEffect(() => {
      setValue("")
    },[refresh])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        if(onChange)
          onChange(value);
      }

  return (
    <FormControl sx={{padding: padding }} fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput fullWidth 
    disabled = { disbled }
    multiline
    minRows={minRows}
    maxRows={maxRows}
    value={areaText ? areaText : value}
    placeholder={placeholder}
      id= {id}
      onChange= { handleOnChange }
      label= {label}
    />
  </FormControl>
  )
}

export default TextFieldArea;