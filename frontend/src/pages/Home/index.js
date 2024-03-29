import React, { useContext, useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import Contexts from '../../contexts'
import { makeStyles } from '@mui/styles'
import { likeComparator } from '../Recipes'
import RecipeSlider from '../../components/RecipeSlider'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    marginTop: '1em',

    '& .header': {
      textAlign: 'center'
    }
  }
}))

const index = () => {
  const classes = useStyles()
  const recipeCtx = useContext(Contexts.RecipeContext)
  const [popularRecipes, setPopularRecipes] = useState(null)

  useEffect(() => {
    const sortedRecipes = recipeCtx.recipes.sort(likeComparator)
    const rec = sortedRecipes.slice(0, recipeCtx.recipes.length < 5 ? recipeCtx.recipes.length : 5)
    setPopularRecipes(rec)
  }, [recipeCtx])


  return (
    popularRecipes &&
    <Grid container direction='column' className={classes.root}>
      <Grid item className='header'>
        <Typography variant='h3'>Welcome</Typography>
        <Typography sx={{ mt: '2em' }} variant='h5'>Popular recipes</Typography>
      </Grid>
      {popularRecipes.length !== 0 &&
      <Grid item className='subHeader'>
        <RecipeSlider recipes={popularRecipes} />
      </Grid>
      }
    </Grid>
  )
}

export default index