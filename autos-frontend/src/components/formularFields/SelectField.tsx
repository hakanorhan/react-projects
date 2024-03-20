import { FormControl, InputLabel, Select, Grid, MenuItem } from "@mui/material"
import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";

const gridWithSM = 3.65;
const gridWithXS = 5.5;

// Components
const SelectField: React.FC<{ values: any[], objectName: string, idOfSelect: string, selectedValue: string,
   handleChange:(event: SelectChangeEvent<string>) => void, label: string }> = ({ values, objectName, idOfSelect, selectedValue, handleChange, label }) => {

    const [disabled, setDisabled] = useState<boolean>(false);
    
    const updateDisabled = () => {
      const value = values.length === 0;
      console.log(value)
      setDisabled(value);
    }

    /*
    useEffect(() => {
      updateDisabled();
    }, [selectedValue])
*/

  return <Grid item xs={11} sm={gridWithXS} md={gridWithSM}>
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select   
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
        label={label}
        name={objectName}
        onChange={handleChange}
      >
        {
          (values) ?
            values.map((item, index) => (
              <MenuItem key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
            )) : null
        }

      </Select>
    </FormControl>
  </Grid>
};

export default SelectField;