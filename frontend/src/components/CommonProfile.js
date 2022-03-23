import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import BlankProfile from '../pages/Profile/blank_profile.png'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    height: '200px',
    '& .MuiButton-root': {
      minWidth: '80px !important'
    },
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      marginTop: '4px',
      width: '5.5em',
      height: '5.5em'
    },
    '& .MuiTypography-body2': {
      opacity: '0.6'
    },
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2),
    },
  }
}))

const CommonProfile = ( { user, children } ) => {
  const [avatar, setAvatar] = useState(null)

  useEffect(async () => {
    if (user.avatar.key === '') {
      setAvatar(BlankProfile)
    } else {
      //setAvatar(BlankProfile)
      setAvatar(`/api/users/avatars/${user.id}`)
    }
  },[])
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={5}>
            <CardContent>
              <CardMedia
                component='img'
                alt="..."
                loading="lazy"
                src={avatar}/>
            </CardContent>
          </Grid>
          <Grid item xs={7}>
            <CardContent>
              <Box display='flex' flexDirection={'column'}>
                <Box>
                </Box>
                <Typography variant='h6'>{user.username}</Typography>
                {/* <Typography variant='body2'>{`Join Date ${user.joinDate}`}</Typography>
                <Typography variant='body1'>{user.description}</Typography> */}
              </Box>
            </CardContent>
          </Grid>

        </Grid>
        {children}

      </CardContent>
    </Card>
  )
}

export default CommonProfile