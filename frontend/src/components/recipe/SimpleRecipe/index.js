import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import recipeStyles from './styles'
import BlankProfile from '../../../pages/Profile/blank_profile.png'
import { generateFoodAvatar } from '../recipeHelpers'
import ImageWithDialog from '../../images/ImageWithDialog'
//import { useDialog } from '../../useDialog'

const SimpleRecipe = ({ recipe, children }) => {
  const [avatar, setAvatar] = useState(BlankProfile)
  let navigate = useNavigate()

  // When Grid with ImageWithDialog is clicked, imgDialogOpen tracks state...
  // ... On new click, no matter the location, same location is called again, toggling the state
  // * THIS PREVENTS REDIRECTIONS TO RECIPE PAGE WHEN IMG IS CLICKED * //
  const [imgDialogOpen, setImgDialogOpen] = useState(false)

  useEffect(async () => {
    // TODO, async?
    if (recipe.avatar.key === '') {
      setAvatar(generateFoodAvatar(recipe.course))
    } else {
      setAvatar(`/api/recipes/avatars/${recipe.id}`)  // Avatar points to API endpoint (get request, returns image as a stream)
    }
  },[])

  const classes = recipeStyles()

  const clicking = (e) => {
    if (!e.target.classList.contains('img-skip-click') && !imgDialogOpen){
      navigate(`/recipes/${recipe.id}`)
    }
  }
  const toggleImgDialogOpen = (e) => {
    if (!(e.target.classList.contains('img-dialog') && imgDialogOpen)) {
      setImgDialogOpen(!imgDialogOpen)
    }
  }
  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent onClick={(e) => clicking(e)}>
          <Grid container direction='column'>
            <Grid item>
              <Box>
                <Typography variant='h6' className={classes.recipeHeader}>{recipe.title}</Typography>
                <Typography variant='caption'>{recipe.user?.username}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Grid container direction='row'>
                <Grid item xs={6} onClick={(e) => toggleImgDialogOpen(e)} >
                  <ImageWithDialog className='img-skip-click' avatar={avatar} alt={'s avatar'} loading="lazy" />
                </Grid>
                <Grid item xs={6} className={classes.recipeInfo}>
                  <Box display='flex' flexDirection={'column'}>
                    <Typography>Likes: {recipe.likers.length}</Typography>
                    <Typography>Difficulty: {recipe.difficulty}</Typography>
                    <Typography noWrap={true}>Time: {recipe.timeEstimate.value} {recipe.timeEstimate.unit}</Typography>
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