import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import React from 'react'

const Select = (props) => {

  const { name, label, value, onChange, options, showNone=true, size, ...others } = props


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

    </FormControl>
  )
}

export default Select