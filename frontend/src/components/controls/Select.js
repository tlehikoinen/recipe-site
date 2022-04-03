import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import React from 'react'

const Select = (props) => {

  const { name, label, value, onChange, options, showNone=true, size, helperText, ...others } = props


  return (
    <FormControl
      size= {size || 'medium'}
      variant="outlined" >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...others} >
        {showNone && <MenuItem value="">None</MenuItem>}
        {
          options.map((item, index) => (
            <MenuItem key={index} value={item.title}>{item.title}</MenuItem>
          ))
        }

      </MuiSelect>
      <FormHelperText error={Boolean(helperText)}>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default Select