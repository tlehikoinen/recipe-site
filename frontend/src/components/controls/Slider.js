import React from 'react'
import { FormControl, Slider as MuiSlider } from '@mui/material'

const Slider = (props) => {
  const { name, value, onChange, marks, ...others } = props

  return (
    <FormControl>
      <MuiSlider
        name={name}
        color="primary"
        onChange={onChange}
        marks={marks}
        value={value}
        {...others} />

    </FormControl>
  )
}

export default Slider