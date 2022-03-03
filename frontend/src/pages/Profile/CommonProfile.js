import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import BlankProfile from './blank_profile.png'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-root': {
      minWidth: '80px !important'
    },
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      marginTop: '4px'
    },
    '& .MuiTypography-body2': {
      opacity: '0.6'
    },
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2),
    },
  }
}))

const CommonProfile = (props) => {
  const { UserProfile } = props
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={4} sm={5}>
            <CardContent>
              <CardMedia
                component='img'
                src={UserProfile.user.avatar || BlankProfile } />
            </CardContent>
          </Grid>
          <Grid item xs={8} sm={7}>
            <CardContent>
              <Box display='flex' flexDirection={'column'}>
                <Box>
                </Box>
                <Typography variant='h6'>{UserProfile.user.username}</Typography>
                <Typography variant='body2'>{`Join Date ${UserProfile.user.joinDate.split('T')[0]}`}</Typography>
                <Typography variant='body1'>{UserProfile.user.description}</Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
        {props.children}
      </CardContent>
    </Card>
  )
}

export default CommonProfile