import { Checkbox as MuiCheckBox, FormControl, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckBox = (props) => {

  const { name, label, value, onChange } = props

  const convertToDefEventPara = (name, value) => ({
    target: {
      name: name,
      value: value
    }
  })

  return (
    <FormControl>
      <FormControlLabel
        control={<MuiCheckBox
          name={name}
          color="primary"
          checked={value}
          label={label}
          onChange={ () => onChange(convertToDefEventPara(name, value))}
        />}
        label={label} />
    </FormControl>
  )
}

export default CheckBox
