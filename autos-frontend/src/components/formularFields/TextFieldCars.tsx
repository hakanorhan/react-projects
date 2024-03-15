import React, { ChangeEvent, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { colorDanger, secondaryColorLight } from '../../themes/ThemeColor';

const TextFieldCars: React.FC<IUseForm2> = ({ id, label, onChange, regex}) => {

    const [valueMatch, setValueMatch] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(value);
        setValueMatch(regex.test(value));
        setIsEmpty(value.length === 0);
      }

  return (
    <FormControl required fullWidth variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
    <OutlinedInput
      id= {id}
      onChange= { handleOnChange }
      label= {label}
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