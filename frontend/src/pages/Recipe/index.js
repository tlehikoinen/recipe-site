import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import recipeServices from '../../services/recipeServices'
import useStyles from './styles'
import { generateFoodAvatar } from '../../components/recipe/recipeHelpers'
import ImageWithDialog from '../../components/images/ImageWithDialog'
import RecipeInfo from './RecipeInfo'
import RecipeIngredients from './RecipeIngredients'
import RecipeInstructions from './RecipeInstructions'
import Button from '../../components/controls/Button'
import Context from '../../contexts/'

const index = () => {
  const classes = useStyles()
  const params = useParams()
  const [recipe, setRecipe] = useState(null)
  const [avatar, setAvatar] = useState(null)

  const context = useContext(Context.UserContext)

  useEffect(() => {
    let isMounted = true
    const recipe = async () => {
      const recipe = await recipeServices.getRecipe(params.id)
      if (recipe.status === 200) {
        if (isMounted) {
          setRecipe(recipe.data)
          if (recipe.data.avatar.key !== '') {
            setAvatar(`/api/recipes/avatars/${recipe.data.id}`)
          } else {
            setAvatar(generateFoodAvatar(recipe.data.course))
          }
        }
      } else {
        setRecipe(false)
      }
    }
    recipe()

    return () => {
      isMounted = false
    }

  }, [])

  const addLike = async () => {
    const response = await recipeServices.addLike(recipe.id)
    if (response.status === 200) {
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (response.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      context.setUser(newUser)
    } else {
      console.log('Adding like failed')
    }
  }

  const removeLike = async () => {
    const response = await recipeServices.removeLike(recipe.id)
    if (response.status === 200) {
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (response.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      context.setUser(newUser)
    } else {
      console.log('Removing like failed')
    }
  }

  const addComment = () => {
    console.log(recipe.id)
  }

  return (
    <>
      {recipe === null ?
        <> </> :
        recipe !== false ?
          <Grid container className={classes.root}>
            <Card>
              <CardContent>
                <Grid item className={classes.header}>
                  <Typography variant='h4'>{recipe.title}</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction='row' className={classes.info}>
                    <Grid item xs={4}>
                      <ImageWithDialog avatar={avatar} alt={recipe.description} loading="lazy" />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{recipe.description}</Typography>
                      {/* <Typography>Tässä vähän pidennettyä kuvausta tästä ja hienosti tuntii ajskdjas ajkldsottavan tilaa</Typography> */}
                      {/* <Typography>{`${recipe.timeEstimate.value} ${recipe.timeEstimate.unit}`}</Typography> */}
                      <RecipeInfo recipe={recipe} type='sm' />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <RecipeInfo recipe={recipe} type='xs'/>
                </Grid>
                <Grid item className={classes.ingredients}>
                  <RecipeIngredients ingredients={recipe.ingredients} />
                </Grid>
                <Grid item>
                  <RecipeInstructions instructions={recipe.steps} />
                </Grid>
                <Grid item>
                  <Grid container spacing={2} sx={{ mt:'4px', display: 'flex', justifyContent: 'end' }}>
                    <Grid item>
                      { context.user ?
                        context.user?.user?.likedRecipes?.includes(recipe.id) ?
                          <Button onClick={removeLike} text='Unlike' /> :
                          <Button onClick={addLike} text='like' />
                        :
                        <Button disabled={true} text='like' />
                      }

                    </Grid>
                    <Grid item>
                      <Button disabled={context.user ? false : true} onClick={addComment} text='Comment' />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sx={{ height: '100px' }}></Grid>
              </CardContent>
            </Card>
          </Grid>
          :
          <>Recipe not found</>
      }
    </>
  )
}

export default index