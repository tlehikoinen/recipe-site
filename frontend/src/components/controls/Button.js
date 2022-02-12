import React from 'react'
import { Button as MuiButton } from '@mui/material'


const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other} >
      {text}
    </MuiButton>
  )
}

export default Button