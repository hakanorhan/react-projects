import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUseForm } from '../../interfaces/IUseForm.js'
import * as SignUpFormular from '../../redux/features/signupFormularSlice.js';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import * as ReduxHelper from '../../helper/reduxHelper.js';
import { FieldId } from '../../constants/FieldIds.js'
import CheckIcon from '@mui/icons-material/Check';

const TextfFieldName: React.FC<IUseForm> = ({ id, htmlForString, label }) => {
  const dispatch = useDispatch();
  const [passwordMatch, setPasswordMatch] = useState(false);
  /**
   * store name in redux.
   * @param event OnChange event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    // Check icon
    const isValid = ReduxHelper.formularNameValid(value);
    setPasswordMatch(isValid);
    switch (id) {
      case FieldId.SIGNUP_TEXTFIELD_NAME: {
        dispatch(SignUpFormular.setValueName(value));
        dispatch(SignUpFormular.setIsValidName(isValid));
      } break;
      case FieldId.SIGNUP_TEXTFIELD_FAMILYNAME: {
        dispatch(SignUpFormular.setValueFamilyname(value));
        dispatch(SignUpFormular.setIsValiFamilyname(isValid));
        break;
      }
    }
  }

  return (
    <>
      <FormControl required fullWidth variant="outlined" sx={{ marginBottom: '0.5rem' }}>
        <InputLabel htmlFor="outlined-adornment-password">{htmlForString}</InputLabel>
        <OutlinedInput
          id={id}
          onChange={handleOnChange}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled
                aria-label="check visibility"
              >
                {passwordMatch ? <CheckIcon /> : ""}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  )
}

export default TextfFieldName;