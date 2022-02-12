import React from 'react'
import { TextField } from '@mui/material'


const Input = ({ name, label, value, onChange, ...others }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...others}
    />
  )
}

export default Input