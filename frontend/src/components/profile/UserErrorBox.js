import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import useStyles from './styles'

const UserErrorBox = ({ message }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5'>{message}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserErrorBox