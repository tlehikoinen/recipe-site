/* eslint-disable */
import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SimpleRecipe from './recipe/SimpleRecipe'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Fab from '@mui/material/Fab'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    marginTop: '1em',
    '& .fab': {
      display: 'flex',
      alignItems: 'center',
    }
    // '& .MuiButtonBase-root': {
    //   marginTop: '4em'
    // }
  }
}))

const RecipeSlider = ({ recipes, text }) => {
  const classes = useStyles()
  const [current, setCurrent] = useState(0) // Start with the index 0
  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item className='fab'>
        <Fab color='primary' sx={{ mr: '2em' }} onClick={() => setCurrent(current === 0 ? recipes.length-1 : current -1)}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </Fab>
      </Grid>
      <Grid item>
        <SimpleRecipe recipe={recipes[current]} />
      </Grid>
      <Grid item className='fab'>
        <Fab color='primary' sx={{ ml: '2em' }} onClick={() => setCurrent(current === recipes.length-1 ? 0 : current +1)}>
          <ArrowRightIcon></ArrowRightIcon>
        </Fab>
      </Grid>
    </Grid>
  )
}

export default RecipeSlider