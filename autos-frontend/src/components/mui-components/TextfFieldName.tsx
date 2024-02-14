import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUseForm } from '../../interfaces/IUseForm.js'
import { setValueName } from '../../redux/features/signupFormularSlice.js';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

const TextfFieldName: React.FC<IUseForm> = ({id, htmlForString, label}) => {
  const dispatch = useDispatch();

  const [useName, setUseName] = useState("");
  /**
   * store name in redux.
   * @param event OnChange event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    setUseName(event.target.value);
  }

  return (
  <>
    <FormControl required fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
          <OutlinedInput
            id={id}
            onBlur={() => { dispatch(setValueName(useName)) }}
            onChange={handleOnChange}
            label= {label}
          />
        </FormControl>
  </>
  )
}

export default TextfFieldName;