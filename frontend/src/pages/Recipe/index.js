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
import Context from '../../contexts/'
import { useDialog } from '../../components/useDialog'
import ConfirmDialog from './ConfirmDialog'
import CommentDialog from './CommentDialog'
import { useForm } from '../../components/useForm'
import BackToTop from '../../components/BackToTop'

const index = () => {
  const classes = useStyles()
  const params = useParams()
  const [recipe, setRecipe] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const history = useNavigate()
  const context = useContext(Context.UserContext)
  const confirmDialog = useDialog()
  const commentDialog = useDialog()
  const [commentDialogError, setCommentDialogError] = useState(false)
  const { values, handleInputChange } = useForm()

  const handleCommentDialogChange = (e) => {
    setCommentDialogError(false)
    handleInputChange(e)
  }
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

  const addComment = async () => {
    if (!values?.comment) {
      setCommentDialogError('Empty message')
      return
    }
    const comment = values.comment
    console.log(comment)
    const response = await recipeServices.postComment(recipe.id, comment)
    if (response.status === 202) {
      commentDialog.handleClose()
    } else {
      setCommentDialogError('Failed')
    }
  }

  const deleteRecipe = async () => {
    const response = await recipeServices.deleteRecipe(recipe.id)
    if (response.status === 202) {
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
                      { context.user?.user.id === recipe.user.id &&
                      <Button {...buttonProps } onClick={confirmDialog.handleOpen} color='error' text='Delete' />
                      }
                    </Grid>
                    <Grid item>
                      { context.user ?
                        context.user?.user?.likedRecipes?.includes(recipe.id) ?
                          <Button { ...buttonProps } onClick={removeLike} text='Unlike' /> :
                          <Button { ...buttonProps } onClick={addLike} text='like' />
                        :
                        <Button { ...buttonProps } disabled={true} text='like' />
                      }

                    </Grid>
                    <Grid item sx={{ mr: '4px' }}>
                      <Button { ...buttonProps } disabled={context.user ? false : true} onClick={commentDialog.handleOpen} text='Comment' />
                    </Grid>
                  </Grid>
                </Grid>

                <RecipeComments comments={recipe.comments} />

              </CardContent>
              <ConfirmDialog open={confirmDialog.open} handleClose={confirmDialog.handleClose} action={deleteRecipe} />
              <CommentDialog
                open={commentDialog.open}
                values={values}
                handleInputChange={handleCommentDialogChange}
                handleClose={commentDialog.handleClose}
                commentDialogError={commentDialogError}
                action={addComment} />
            </Card>
            <BackToTop />
          </Grid>
          :
          <>Recipe not found</>
      }
    </>
  )
}

export default index