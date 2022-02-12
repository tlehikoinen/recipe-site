import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@mui/material'
import React from 'react'

const RadioGroup = (props) => {
  const { label, value, onChange, items } = props

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        row={true}
        value={value}
        onChange={onChange}>
        {items.map((item, index) =>
          <FormControlLabel key={index} value={item.id} control={<Radio />} label={item.title} />
        )}
      </MuiRadioGroup>
    </FormControl>

  )
}

export default RadioGroup