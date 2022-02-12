import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

export const Logo = () => {
  return(
    <Box sx={{ display: 'flex' }} alignItems="center">
      <RestaurantMenuIcon/>
      <Typography variant="h5">
        Recipes
      </Typography>
    </Box>
  )
}