import { FormControl, InputLabel, Select, MenuItem, Tooltip } from "@mui/material"
import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { SelectFieldEnums } from "../../../../autos-backend/src/enums/SelectFieldEnums";
import { secondaryColorLight } from "../../themes/ThemeColor";

// Components
const SelectField: React.FC<{
  values: any[], objectName: string, idOfSelect: string, selectedValue: string,
  handleChange: (event: SelectChangeEvent<string>) => void, label: string, allOption?: boolean
}> = ({ values, objectName, idOfSelect, selectedValue, handleChange, label, allOption }) => {
  return <>
    {
      values.length === 0 ? (
        <Tooltip title={`Kein ${label} vorhanden`}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              disabled={values.length === 0}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label={label}
              name={objectName}
              onChange={handleChange}
            >
              {
                (allOption) ? <MenuItem key={ SelectFieldEnums.ITEM_KEY } value={ SelectFieldEnums.ALL_VALUE }> { SelectFieldEnums.DE_ALL_LABEL } </MenuItem> : []
              }
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
            disabled={values.length === 0}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label={label}
            name={objectName}
            onChange={handleChange}
          >
            {
              (allOption) ? <MenuItem sx={{ backgroundColor: secondaryColorLight }} key={ SelectFieldEnums.ITEM_KEY } value={ SelectFieldEnums.ALL_VALUE }> { SelectFieldEnums.DE_ALL_LABEL } </MenuItem> : []
            }
            {
              (values) ? (
                values.map((item, index) => (
                  <MenuItem key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
                ))) : null
            }

          </Select>
        </FormControl>
      )
    }
  </>
};

export default SelectField;