import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseFormTextArea } from '../../interfaces/IUseForm';
import { FormControl, OutlinedInput } from '@mui/material';

const TextFieldArea: React.FC<IUseFormTextArea> = ({ padding, id, onChange, placeholder, minRows, maxRows, refresh, disbled, areaText }) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("")
  }, [refresh])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    if (onChange)
      onChange(value);
  }

  return (
    <FormControl sx={{ padding: padding }} fullWidth variant="standard">

      <OutlinedInput fullWidth
        disabled={disbled}
        name={id}
        autoComplete='off'
        multiline
        minRows={minRows}
        maxRows={maxRows}
        value={areaText ? areaText : value}
        placeholder={placeholder}
        onChange={handleOnChange}
        inputProps={{ sx: { '::placeholder': { color: 'text.primary', opacity: 1 } } }}
      />
    </FormControl>
  )
}

export default TextFieldArea;