import { FormControl, InputLabel, Select, MenuItem, Tooltip } from "@mui/material"
import { SelectChangeEvent } from "@mui/material";
import React, { memo } from "react";
import { SelectFieldEnums } from "../../constants/values";

// Components
const SelectField: React.FC<{
  values: any[], objectName: string, idOfSelect: string, selectedValue: string,
  handleChange: (event: SelectChangeEvent<string>) => void, label: string, allOption?: boolean
}> = ({ values, objectName, idOfSelect, selectedValue, handleChange, label, allOption }) => {

  const FIELD_STYLE = { color: 'text' };

  return <>
    {
      values.length === 0 ? (
        <Tooltip title={`Kein ${label} vorhanden`}>
          <FormControl variant="outlined">
            <InputLabel id={`${objectName}-id`} htmlFor={objectName}>{label}</InputLabel>
            <Select
              disabled={values.length === 0}
              value={selectedValue ?? ''}
              label={label}
              labelId={`${objectName}-label-id`}
              name={objectName}
              onChange={handleChange}
              inputProps={{
                id: objectName,
                "aria-labelledby": `${objectName}labelled-by`
              }}
            >
              {
                (allOption) ? <MenuItem sx={FIELD_STYLE} key={SelectFieldEnums.ITEM_KEY} value={SelectFieldEnums.ALL_VALUE}> {SelectFieldEnums.DE_ALL_LABEL} </MenuItem> : []
              }
              {
                (values) ?
                  values.map((item, index) => (
                    <MenuItem sx={FIELD_STYLE} key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
                  )) : null
              }

            </Select>
          </FormControl>
        </Tooltip>
      ) : (
        <FormControl variant="outlined">
          <InputLabel id={`${objectName}-id`} htmlFor={objectName}>{label}</InputLabel>
          <Select
            disabled={values.length === 0}
            value={selectedValue ?? ''}
            label={label}
            labelId={`${objectName}label-id`}
            name={objectName}
            onChange={handleChange}
            inputProps={{
              id: objectName,
              "aria-labelledby": `${objectName}labelled-by`
            }}
          >
            {
              (allOption) ? <MenuItem sx={FIELD_STYLE} key={SelectFieldEnums.ITEM_KEY} value={SelectFieldEnums.ALL_VALUE}> {SelectFieldEnums.DE_ALL_LABEL} </MenuItem> : []
            }
            {
              (values) ? (
                values.map((item, index) => (
                  <MenuItem sx={FIELD_STYLE} key={index} value={item[idOfSelect]}> {item[objectName]} </MenuItem>
                ))) : null
            }

          </Select>
        </FormControl>
      )
    }
  </>
};

export default memo(SelectField);