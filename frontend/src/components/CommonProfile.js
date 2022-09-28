import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import BlankProfile from '../pages/Profile/blank_profile.png'
import ImageWithDialog from './images/ImageWithDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      boxShadow: '0px 0px 8px 2px !important'
    },
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
  const [recipeCount, setRecipeCount] = useState(0)

  useEffect(async () => {
    setRecipeCount(user.recipes.length)
    if (user.avatar.key === '') {
      setAvatar(BlankProfile)
    } else {
      setAvatar(`/api/users/avatars/${user.id}`)  // Avatar points to API endpoint (get request, returns image as a stream)
    }
  },[])
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={5}>
            <CardContent>
              <ImageWithDialog avatar={avatar} />
              {/*
                // <CardMedia
                // component='img'
                // alt={`${user.username}'s avatar`}
                // loading="lazy"
                // src={avatar}/> */}
            </CardContent>
          </Grid>
          <Grid item xs={7}>
            <CardContent>
              <Box display='flex' flexDirection={'column'}>
                <Box>
                </Box>
                <Typography variant='h6'>{user.username}</Typography>
                <Typography sx={{ margin: '10px 0px 0px 5px' }}>Recipes: {recipeCount}</Typography>
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