import { FormControl, InputLabel, Select, MenuItem, Tooltip, Box } from "@mui/material"
import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { SelectFieldEnums } from "../../../../autos-backend/src/enums/SelectFieldEnums";

// Components
const SelectField: React.FC<{
  values: any[], objectName: string, idOfSelect: string, selectedValue: string,
  handleChange: (event: SelectChangeEvent<string>) => void, label: string, allOption?: boolean
}> = ({ values, objectName, idOfSelect, selectedValue, handleChange, label, allOption }) => {
  
  const FIELD_STYLE = { color: 'sexondary.contrastText' };
  
  return <Box onClick={(e) => e.stopPropagation()}>
    {
      values.length === 0 ? (
        <Tooltip title={`Kein ${label} vorhanden`}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select sx={{ borderRadius: 0 }}
              disabled={values.length === 0}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label={label}
              name={objectName}
              onChange={handleChange}
            >
              {
                (allOption) ? <MenuItem sx={ FIELD_STYLE } key={ SelectFieldEnums.ITEM_KEY } value={ SelectFieldEnums.ALL_VALUE }> { SelectFieldEnums.DE_ALL_LABEL } </MenuItem> : []
              }
              {
                (values) ?
                  values.map((item, index) => (
                    <MenuItem sx={ FIELD_STYLE } key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
                  )) : null
              }

            </Select>
          </FormControl>
        </Tooltip>
      ) : (
        <FormControl>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select sx={{ borderRadius: 0 }}
            disabled={values.length === 0}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label={label}
            name={objectName}
            onChange={handleChange}
          >
            {
              (allOption) ? <MenuItem sx={ FIELD_STYLE } key={ SelectFieldEnums.ITEM_KEY } value={ SelectFieldEnums.ALL_VALUE }> { SelectFieldEnums.DE_ALL_LABEL } </MenuItem> : []
            }
            {
              (values) ? (
                values.map((item, index) => (
                  <MenuItem sx={ FIELD_STYLE } key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
                ))) : null
            }

          </Select>
        </FormControl>
      )
    }
  </Box>
};

export default SelectField;