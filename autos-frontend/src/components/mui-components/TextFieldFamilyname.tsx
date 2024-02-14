import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUseForm } from '../../interfaces/IUseForm.js'
import { setValueFamilyname } from '../../redux/features/signupFormularSlice.js';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

const TextfFieldFamilyname: React.FC<IUseForm> = ({id, htmlForString, label}) => {
  const dispatch = useDispatch();
  const [useFamilyname, setUseFamilyname] = useState("");
  /**
   * store name in redux.
   * @param event OnChange event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    setUseFamilyname(event.target.value);
  }

  return (
  <>
    <FormControl fullWidth variant="outlined" sx={{marginBottom: '0.5rem'}}>
          <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
          <OutlinedInput
            id={id}
            onChange={handleOnChange}
            onBlur={() => { dispatch(setValueFamilyname(useFamilyname)) }}
            label= {label}
          />
        </FormControl>
  </>
  )
}

export default TextfFieldFamilyname;