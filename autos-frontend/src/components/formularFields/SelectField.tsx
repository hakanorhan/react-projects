import { FormControl, InputLabel, Select, Grid, MenuItem, Tooltip } from "@mui/material"
import { SelectChangeEvent } from "@mui/material";
import React from "react";

const gridWithSM = 3.65;
const gridWithXS = 5.5;

// Components
const SelectField: React.FC<{ values: any[], objectName: string, idOfSelect: string, selectedValue: string,
   handleChange:(event: SelectChangeEvent<string>) => void, label: string, itemXSValue?: number }> = ({ values, objectName, idOfSelect, selectedValue, handleChange, label, itemXSValue }) => {

    // TODO: update disabled
    //const [disabled, setDisabled] = useState<boolean>(false);
    
    /* TODO: update disabled
    const updateDisabled = () => {
      const value = values.length === 0;
      console.log(value)
      setDisabled(value);
    } */

    /*
    useEffect(() => {
      updateDisabled();
    }, [selectedValue])
*/
    {/* Grid item xs={itemXSValue ? itemXSValue : 11} sm={gridWithXS} md={gridWithSM}> */}
  return <>
    {
      values.length === 0 ? (
        <Tooltip title={ `Kein ${label} vorhanden` }> 
      <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        disabled = {values.length === 0}
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
    </Tooltip>
      ) : (
      <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        disabled = {values.length === 0}
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
      )
    }
  </>
};

export default SelectField;