import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import recipeStyles from './styles'
import BlankProfile from '../../../pages/Profile/blank_profile.png'
import { generateFoodAvatar } from '../recipeHelpers'
import ImageWithDialog from '../../images/ImageWithDialog'

const SimpleRecipe = ({ recipe, children }) => {
  const [avatar, setAvatar] = useState(BlankProfile)

  useEffect(async () => {
    if (recipe.avatar.key === '') {
      setAvatar(generateFoodAvatar(recipe.course))
    } else {
      setAvatar(`/api/users/avatars/${recipe.avatar.id}`)  // Avatar points to API endpoint (get request, returns image as a stream)
    }
  },[])

  const classes = recipeStyles()

  const clicking = (id) => {
    console.log(`Clicked recipe id ${id}`)
  }
  return (
    <Grid container className={classes.root} onClick={() => clicking(recipe.id)}>
      <Card className={classes.card} sx={{ raised: true }}>
        <CardContent>
          <Grid container direction='column'>
            <Grid>
              <Box>
                <Typography variant='h6' className={classes.recipeHeader}>{recipe.title}</Typography>
                <Typography variant='caption'>{recipe.user?.username}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Grid container direction='row'>
                <Grid item xs={5}>
                  <ImageWithDialog avatar={avatar} alt={'s avatar'} loading="lazy" />
                </Grid>
                <Grid item xs={7} className={classes.recipeInfo}>
                  <Box display='flex' flexDirection={'column'}>
                    <Typography>Likes: {recipe.likes}</Typography>
                    <Typography>Difficulty: {recipe.difficulty}</Typography>
                    <Typography noWrap={true}>Time: {recipe.timeEstimate.value} {recipe.timeEstimate.timeUnit}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <div className={classes.buttons}>
                {children}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default SimpleRecipe