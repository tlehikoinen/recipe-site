
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React,  { useEffect, useState } from 'react'
import useStyles from './styles'
import BlankProfile from './blank_profile.png'

import ImageWithDialog from '../images/ImageWithDialog'

const UserProfile = ({ user, children }) => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState(BlankProfile)



  useEffect(() => {
    if (user.avatar.key !== '') {
      setAvatar(`/api/users/avatars/${user.id}`)
    }
  }, [])

  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <CardContent>
                <ImageWithDialog avatar={avatar} />
                {/* <CardMedia
                  onClick={() => handleOpen(true)}
                  component='img'
                  src={avatar} /> */}
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Box display='flex' flexDirection={'column'}>
                  <Box>
                  </Box>
                  <Typography variant='h6'>{user.username}</Typography>
                  <Typography variant='body2'>{`Join Date ${user.joinDate.split('T')[0]}`}</Typography>
                  <Typography variant='body1'>{user.description}</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
          {children}
        </CardContent>
      </Card>
    </Grid>

  )
}

export default UserProfile