import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import recipeServices from '../../services/recipeServices'
import useStyles from './styles'
import { generateFoodAvatar } from '../../components/recipe/recipeHelpers'
import ImageWithDialog from '../../components/images/ImageWithDialog'
import RecipeComments from './RecipeComments'
import RecipeInfo from './RecipeInfo'
import RecipeIngredients from './RecipeIngredients'
import RecipeInstructions from './RecipeInstructions'
import Button from '../../components/controls/Button'
import Contexts from '../../contexts/'
import { useDialog } from '../../components/useDialog'
import ConfirmDialog from './ConfirmDialog'
import CommentDialog from './CommentDialog'
import { useForm } from '../../components/useForm'
import BackToTop from '../../components/BackToTop'
import RecipeErrorBox from './RecipeErrorBox'

const index = () => {
  const classes = useStyles()
  const params = useParams()
  const [recipe, setRecipe] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const history = useNavigate()
  const userCtx = useContext(Contexts.UserContext)
  const confirmDialog = useDialog()
  const commentDialog = useDialog()
  const [commentDialogError, setCommentDialogError] = useState(false)
  const { values, handleInputChange } = useForm()

  const recipeCtx = useContext(Contexts.RecipeContext)
  const handleCommentDialogChange = (e) => {
    setCommentDialogError(false)
    handleInputChange(e)
  }

  useEffect(() => {
    const recipeInCtx = recipeCtx.recipes.find(r => r.id === params.id)
    if (recipeInCtx) {
      setRecipe(recipeInCtx)
      if (recipeInCtx.avatar.key !== '') {
        setAvatar(`/api/recipes/avatars/${recipeInCtx.id}`)
      } else {
        setAvatar(generateFoodAvatar(recipeInCtx.course))
      }
    } else {
      setRecipe(false)
      setAvatar(generateFoodAvatar('sweet'))
    }

  }, [recipeCtx])

  const addLike = async () => {
    const response = await recipeServices.addLike(recipe.id)
    // Returns updated user
    if (response.status === 200) {
      // As response does not return updated recipe, likes are incremented manually
      const newRecipes = recipeCtx.recipes
        .map(r => r.id === recipe.id
          ? { ...r, likers: r.likers.concat(response.data.user.id) }
          : r)
      recipeCtx.setRecipes(newRecipes)

      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (response.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      userCtx.setUser(newUser)
    } else {
      console.log('Adding like failed')
    }
  }

  const removeLike = async () => {
    const response = await recipeServices.removeLike(recipe.id)
    if (response.status === 200) {
      // As response does not return updated recipe, likes are decremented manually
      const newRecipes = recipeCtx.recipes
        .map(r => r.id === recipe.id
          ? { ...r, likers: r.likers.filter(r => r !== response.data.user.id) }
          : r)
      console.log(newRecipes)
      recipeCtx.setRecipes(newRecipes)

      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (response.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      userCtx.setUser(newUser)
    } else {
      console.log('Removing like failed')
    }
  }

  const addComment = async () => {
    if (!values?.comment) {
      setCommentDialogError('Empty message')
      return
    }
    const comment = values.comment
    const response = await recipeServices.postComment(recipe.id, comment)
    if (response.status === 202) {
      const newRecipes = recipeCtx.recipes.map(r => r.id === recipe.id ? response.data.recipe : r)
      recipeCtx.setRecipes(newRecipes)
      commentDialog.handleClose()
    } else {
      setCommentDialogError('Failed')
    }
  }

  const deleteRecipe = async () => {
    const response = await recipeServices.deleteRecipe(recipe.id)
    if (response.status === 202) {
      // Update recipes
      const newRecipes = recipeCtx.recipes.filter(r => r.id !== recipe.id)
      recipeCtx.setRecipes(newRecipes)

      // Update user
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...userCtx.user.user, recipes: userCtx.user.user.recipes.filter(r => r.id !== recipe.id) }
      const updatedUser = { ...JSON.parse(prevUser), user: newUser }
      window.localStorage.setItem('userJson', JSON.stringify(updatedUser))
      userCtx.setUser(updatedUser)

      confirmDialog.handleClose()
      history('/recipes')
    } else {
      console.log('Recipe deletion failed')
    }
    console.log(response)
  }


  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const buttonProps = {
    size: isSmallScreen ? 'small' : 'large'
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
                <Grid item sx={{ height: '40px' }}></Grid>
                <Grid item>
                  <Grid container spacing={1} sx={{ mt:'4px' }}>
                    <Grid item sx={{ ml: '4px', flexGrow: 1 }}>
                      { (userCtx.user && recipe.user) && userCtx.user?.user.id === recipe.user?.id &&
                      <Button {...buttonProps } onClick={confirmDialog.handleOpen} color='error' text='Delete' />
                      }
                    </Grid>
                    <Grid item>
                      { userCtx.user ?
                        userCtx.user?.user?.likedRecipes?.includes(recipe.id) ?
                          <Button { ...buttonProps } onClick={removeLike} text='Unlike' /> :
                          <Button { ...buttonProps } onClick={addLike} text='like' />
                        :
                        <Button { ...buttonProps } disabled={true} text='like' />
                      }

                    </Grid>
                    <Grid item sx={{ mr: '4px' }}>
                      <Button { ...buttonProps } disabled={userCtx.user ? false : true} onClick={commentDialog.handleOpen} text='Comment' />
                    </Grid>
                  </Grid>
                </Grid>

                <RecipeComments comments={recipe.comments} recipeCtx={recipeCtx} />

              </CardContent>
              <ConfirmDialog open={confirmDialog.open} handleClose={confirmDialog.handleClose} action={deleteRecipe} />
              <CommentDialog
                open={commentDialog.open}
                values={values}
                handleInputChange={handleCommentDialogChange}
                handleClose={commentDialog.handleClose}
                commentDialogError={commentDialogError}
                action={addComment}
                title='Add comment'
                submitBtnText='Add' />
            </Card>
            <BackToTop />
          </Grid>
          :
          <RecipeErrorBox message='Recipe not found' />
      }
    </>
  )
}

export default index