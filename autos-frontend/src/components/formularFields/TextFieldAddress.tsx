import React, { useState } from 'react'

import { IUseFormAdress } from '../../interfaces/IUseForm';
import { DivTwoFieldsWithSpaceBetween, DivWidthTwoFieldsRow } from '../../themes/ThemeColor';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
const TextFieldAddress: React.FC<IUseFormAdress> = ({ streetNrField, cityField, zipcodeField, bundeslandField }) => {

  const [streetNrMatch, setStreetNrMatch] = useState(null);
  const [cityMatch, setCityMatch] = useState(null);
  const [zipcodeMatch, setZipCodeMatch] = useState(null);
  const [bundeslandMatch, setBundeslandMatch] = useState(null);

  return (
    <>
      {/* Address and zipcode */}
      <DivTwoFieldsWithSpaceBetween>
        {/* Address */}
        <DivWidthTwoFieldsRow>
          <FormControl required variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{streetNrField.label}</InputLabel>
            <OutlinedInput
              id={streetNrField.id}
              onChange={() => { }}
              inputRef={streetNrField.inputRef}
              label="Address Nr"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disabled
                    aria-label="check visibility"
                  >
                    {streetNrMatch ? <CheckIcon /> : ""}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DivWidthTwoFieldsRow>

        {/* Zipcode */}
        <DivWidthTwoFieldsRow>
          <FormControl required variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-password">{bundeslandField.label}</InputLabel>
            <OutlinedInput
              id={zipcodeField.label}
              onChange={() => { }}
              inputRef={zipcodeField.inputRef}
              label={bundeslandField.label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton disabled
                    aria-label="check visibility"
                  >
                    {zipcodeMatch ? <CheckIcon /> : ""}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DivWidthTwoFieldsRow>
      </DivTwoFieldsWithSpaceBetween>

      {/* City */}
      <Box>
        <FormControl required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{cityField.label}</InputLabel>
          <OutlinedInput
            id="city"
            onChange={() => { }}
            inputRef={cityField.inputRef}
            label="City"
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled
                  aria-label="check visibility"
                >
                  {cityMatch ? <CheckIcon /> : ""}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>

      {/* Bundesland */}
      <Box>
        <FormControl required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{bundeslandField.label}</InputLabel>
          <OutlinedInput
            id="bundesland"
            onChange={() => { }}
            inputRef={bundeslandField.inputRef}
            label="Bundesland"
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled
                  aria-label="check visibility"
                >
                  {bundeslandMatch ? <CheckIcon /> : ""}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  )
}

export default TextFieldAddress;
