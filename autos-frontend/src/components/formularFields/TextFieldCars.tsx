import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { colorDanger, secondaryColorLight } from '../../themes/ThemeColor';

const TextFieldCars: React.FC<IUseForm2> = ({ id, label, onChange, regex, refresh}) => {

    const [valueMatch, setValueMatch] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [value, setValue] = useState("");

    useEffect(() => {
      setValue('');
      setValueMatch(false);
      setIsEmpty(true);
    }, [refresh])

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value;
        setValue(currentValue);
        onChange(currentValue);
        setValueMatch(regex.test(currentValue));
        setIsEmpty(currentValue.length === 0);
      }

  return (
    <FormControl required fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
      id= {id}
      onChange= { handleOnChange }
      label= {label}
      value={value}
      inputProps={{ maxLength: (id === 'zipcode') ? 5 : 55 }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            {valueMatch ? <CheckIcon sx={{ color: secondaryColorLight }}/> : 
              isEmpty ? "" : <ErrorOutlineIcon sx={{ color: colorDanger }} /> }
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
  )
}

export default TextFieldCars;