import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import recipeStyles from './styles'
import BlankProfile from '../../../pages/Profile/blank_profile.png'
import { generateFoodAvatar } from '../recipeHelpers'
//import { useDialog } from '../../useDialog'

const RecipeWithImage = ({ recipe }) => {
  const [avatar, setAvatar] = useState(BlankProfile)
  let navigate = useNavigate()

  useEffect(() => {
    if (recipe.avatar.key === '') {
      setAvatar(generateFoodAvatar(recipe.course))
    } else {
      setAvatar(`/api/recipes/avatars/${recipe.id}`)  // Avatar points to API endpoint (get request, returns image as a stream)
    }
  }, [recipe])

  const classes = recipeStyles()

  const clicking = () => {
    navigate(`/recipes/${recipe.id}`)
  }

  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent onClick={(e) => clicking(e)}>
          <Grid container direction='column'>
            <Grid item sx={{ textAlign: 'center' }}>
              <Box>
                <Typography variant='h6'>{recipe.title}</Typography>
                <Typography variant='caption'>{recipe?.user?.username || 'Anonymous'}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Grid container direction='row' sx={{ justifyContent: 'center' }}>
                <Grid>
                  <CardMedia image={avatar} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default RecipeWithImage