import React, { useContext } from 'react'
import { Box, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material'
import { useForm } from '../../useForm'
import useStyles from './styles.js'
import Controls from '../../controls/Controls'
import IngredientInput from '../../InputTable/IngredientInput'
import StepInput from '../../InputTable/StepInput'
import ImageLoader from '../../ImageLoader'
import recipeServices from '../../../services/recipeServices'
import Contexts from '../../../contexts'
import { allImages, courseOptions, difficultyOptions, recipeValidationData, timeScaleValues } from '../recipeHelpers'

const index = ({ close }) => {
  const classes = useStyles()
  const recipeCtx = useContext(Contexts.RecipeContext)
  const userCtx = useContext(Contexts.UserContext)
  const { file, setFile, inputFile, onChangeFile, avatar, setAvatar } = ImageLoader()
  const { values, setValues, handleInputChange, resetValues, validation, setValidation } = useForm({
    title: '',
    description: '',
    course: '',
    difficulty: '',
    ingredients: [],
    timeEstimate: 3,
    steps: [],
    servings: 1
  },
  recipeValidationData)

  const submitValues = async () => {
    let imgError = false
    // Convert timeEstimate to { value, unit } form
    const [value, unit] = timeScaleValues[values.timeEstimate].split(' ')
    const convertedValues = { ...values, timeEstimate: { value: value, unit: unit } }
    const res = await recipeServices.addRecipe(convertedValues)
    if (res.status === 200) {
      // Image is loaded in its own request after first request with recipe data is done
      if (file) {
        const imgRes = await recipeServices.postAvatar(res.data.id, file)
        if (imgRes.status !== 200) {
          imgError = true
        } else {
          res.data = { ...res.data, avatar: imgRes.data.recipe.avatar }
        }
      }
      // Update contexts
      const updatedRecipes = recipeCtx.recipes.concat(res.data)
      recipeCtx.setRecipes(updatedRecipes)

      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...userCtx.user.user, recipes: userCtx.user.user.recipes.concat(res.data) }

      const updatedUser = { ...JSON.parse(prevUser), user: (newUser) }
      window.localStorage.setItem('userJson', JSON.stringify(updatedUser))

      //userCtx.setUser({ ...userCtx.user, user: newUser })
      userCtx.setUser(updatedUser)
      if (imgError) {
        alert('Image was not supported')
      }
      close()


    } else {
      // Error data for validation is in form: '{Schema} validation failed: error message for `field`, error message for `field2`...
      // Parse each message by splitting at comma (,), slice error field by using gravis (`) characters
      if (res?.data?.error.startsWith('Recipe validation failed:')) {
        const errorFields = res.data.error
          .split(',')
          .map(f => f.slice(f.indexOf('`') +1, f.lastIndexOf('`')).toLowerCase())

        // Make new validationData object, changing error property to match response msg
        var newValidationData = Object.keys(recipeValidationData).reduce((acc, elem) => {
          acc[elem] = errorFields.includes(elem.toString().toLowerCase()) ? { ...recipeValidationData[elem], error: true } : recipeValidationData[elem]
          return acc
        }, {})

        setValidation(newValidationData)
      }
    }
  }

  const resetFields = () => {
    resetValues()
    setFile(null)
    setAvatar(allImages.saltys[0])
  }

  return (
    <Grid container direction='column' className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <CardHeader sx={{ textAlign: 'center' }} titleTypographyProps={{ variant: 'h4' }} title="New recipe" />

          <Grid item xs={12}>
            <Grid container className='centered'>
              <Grid item >
                <input
                  style={{ display: 'none' }}
                  ref={inputFile}
                  type="file"
                  accept="image"
                  onChange={(e) => onChangeFile(e)}
                />
                <CardMedia
                  onClick={() => inputFile.current.click()}
                  component='img'
                  src={avatar || allImages.saltys[0]} />
              </Grid>
              <Grid item>
                <Box display='flex' flexDirection={'column'}>
                  <Controls.Input
                    value={values.title}
                    error={validation.title.error}
                    helperText={validation.title.error && validation.title.errorMsg}
                    name='title'
                    label='Name'
                    multiline
                    onChange={handleInputChange} />
                  <Controls.Input
                    value={values.description}
                    error={validation.description.error}
                    helperText={validation.description.error && validation.description.errorMsg}
                    name='description' label='Description'
                    onChange={handleInputChange}
                    multiline />
                </Box>
              </Grid>

            </Grid>
          </Grid>

          <Grid item className='centered'>
            <Controls.Select
              showNone={false}
              error={validation.course.error}
              helperText={validation.course.error && validation.course.errorMsg}
              label='Course'
              name='course'
              value={values.course}
              onChange={handleInputChange}
              options={courseOptions} />

            <Controls.Input
              sx={{ maxWidth: '30px' }}
              type='number'
              error={validation.servings.error}
              helperText={validation.servings.error && validation.servings.errorMsg}
              label='Servings'
              name='servings'
              value={values.servings}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 1, max: 255 } }}/>

            <Controls.Select
              showNone={false}
              error={validation.difficulty.error}
              helperText={validation.difficulty.error && validation.difficulty.errorMsg}
              label='Difficulty'
              name='difficulty'
              value={values.difficulty}
              onChange={handleInputChange}
              options={difficultyOptions} />

          </Grid>

          <Grid item className='centered'>
            <Box>
              <Controls.Slider
                sx={{ minWidth: '300px' }}
                name='timeEstimate'
                label='Time'
                min={0}
                max={timeScaleValues.length - 1}
                step={1}
                value={values.timeEstimate}
                onChange={handleInputChange}
                valueLabelFormat={timeScaleValues[values.timeEstimate]}
                valueLabelDisplay='auto' />
              <Typography sx={{ textAlign: 'center' }} id="non-linear-slider" gutterBottom>
                Cook Time: {timeScaleValues[values.timeEstimate]}
              </Typography>
            </Box>
          </Grid>

          <Grid item className='centered-input'>
            <Typography sx={{ textAlign: 'center', marginTop: '1em' }} variant='h4'>Ingredients</Typography>
            <IngredientInput handleInputChange={handleInputChange} values={values} setValues={setValues} />
          </Grid>

          <Grid item className='centered-input'>
            <Typography sx={{ textAlign: 'center', marginTop: '1em' }} variant='h4'>Steps</Typography>
            <StepInput handleInputChange={handleInputChange} values={values} setValues={setValues} />
          </Grid>

          <Grid className='centered' item sx={{ height: '50px' }}>

          </Grid>

          <Grid item sx={{ marginBottom: '2em' }}>
            <Grid container>
              <Grid item style={{ flexGrow: '1' }}>
                <Controls.Button size='small' text='Clear' onClick={resetFields} />
                <Controls.Button sx={{ marginLeft: '10px' }} size='small' text='Cancel' onClick={close} />
              </Grid>
              <Grid item xs={4}>
                <Controls.Button onClick={submitValues} className='submit-button' size='small' text='Add recipe' />
              </Grid>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>

  )
}

export default index