import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUseForm2 } from '../../interfaces/IUseForm';
import { FormControl, InputLabel, InputAdornment, IconButton, Input } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { COMPONENT_DISTANCE, colorDanger } from '../../themes/Theme';
const TextFieldCars: React.FC<IUseForm2> = ({ id, label, onChange, regex, refresh, maxLength, checkEmail}) => {
    
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
        if(regex)
          setValueMatch(regex.test(currentValue));
        setIsEmpty(currentValue.length === 0);
      }

  return (
    <FormControl sx={{ paddingBottom: COMPONENT_DISTANCE }} onClick={(e) => e.stopPropagation()} required fullWidth variant="standard" >
    <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
    <Input
      id= {id}
      onChange= { handleOnChange }
      value={value}
      inputProps={{ maxLength: (maxLength !== undefined) ? maxLength : 55 }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton disabled
            aria-label="check visibility"
          >
            
            { checkEmail === undefined ? valueMatch ? <CheckIcon /> : 
              isEmpty ? "" : <ErrorOutlineIcon sx={{ color: colorDanger }} /> : checkEmail && valueMatch ? <CheckIcon /> : <ErrorOutlineIcon sx={{ color: colorDanger }} /> }
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
  )
}

export default TextFieldCars;