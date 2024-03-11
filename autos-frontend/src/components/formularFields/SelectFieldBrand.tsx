import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material"
import React from "react";

const gridWithSM = 3.65;
const gridWithXS = 5.5;

  // Components
  const SelectFieldBrand :React.FC<{values: any[], selectedValue: string, handleChange: any}> = ({ values, selectedValue, handleChange}) => {

    console.log(values);

    return <Grid item xs={11} sm={gridWithXS} md={gridWithSM}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Marke</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= { selectedValue }
          label="Marke"
          onChange={handleChange}
        >
          {
            (values) ?
            values.map((item, index) => (
              <MenuItem key={index} value={item.brandid}> {item.marke} </MenuItem>
            )) : null
          } 
        </Select>
      </FormControl>
    </Grid>
  };

  export default SelectFieldBrand;



  /*
  {
            values.map((item, index) => (
              <MenuItem key={index} value={item}>{item}</MenuItem>
            )) 
          }
  */