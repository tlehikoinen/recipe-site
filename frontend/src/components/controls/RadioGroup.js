import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@mui/material'
import React from 'react'

const RadioGroup = (props) => {
  const { label, name, value, onChange, items } = props

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        row={true}
        name={name}
        value={value}
        //onChange={onChange}
        onClick={onChange}> { /* onClick gives possibility to uncheck */}
        {items.map((item, index) =>
          <FormControlLabel key={index} value={item.title} control={<Radio />} label={item.title} />
        )}
      </MuiRadioGroup>
    </FormControl>

  )
}

export default RadioGroup