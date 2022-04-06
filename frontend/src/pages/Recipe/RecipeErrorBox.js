import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import useStyles from './styles'

const RecipeErrorBox = ({ message }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography sx={{ textAlign: 'center' }} variant='h5'>{message}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default RecipeErrorBox