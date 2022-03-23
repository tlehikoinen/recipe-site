/* eslint-disable */
import { Box, Button, Card, CardActions, CardHeader, CardMedia, Paper } from '@mui/material'
import { minWidth } from '@mui/system'
import React from 'react'


const UserProfile = ({ user }) => {
  console.log(user)
  return (
    <Card sx={{ display: 'flex', minWidth: '200px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardHeader title={user.username} sx={{ textAlign: 'center' }} />
          <CardMedia 
            component="img"
            height='50'
            image={user.avatar}
          />
        </Box>
        <CardActions>
          <Button>ok</Button>
          <Button>ok</Button>
        </CardActions>
      </Box>

    </Card>

  )
}

export default UserProfile