/* eslint-disable */
import { Box, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import Button from '../../controls/Button'
import { useForm } from '../../useForm'
import useStyles from './styles.js'
import Controls from '../../controls/Controls'
import allImages from '../recipeHelpers'
import IngredientInput from '../../InputTable/IngredientInput'
import StepInput from '../../InputTable/StepInput'

const difficultyOptions = [
  { id: 1, title: 'Easy' },
  { id: 2, title: 'Medium' },
  { id: 3, title: 'Hard' }
]
const courseOptions = [
  { id: 1, title: 'Savory' },
  { id: 2, title: 'Vegetarian' },
  { id: 3, title: 'Sweet' }
]
const timeScaleValues = [
  '15 min', '30 min', '45 min', '1 h', '1.5 h', 
  '2 h', '2.5 h', '3 h', '4 h', '5h',
  '6 h', '8 h', '10 h', '12 h', '16 h',
  '1 d', '2 d', '3 d', '4 d', '5 d',
  '1 week', '2 week', '3 week', '1 month'
]

const index = ({ close }) => {
  const classes = useStyles()

  const submitValues = () => {
    console.log(values)
  }

  const { values, setValues, handleInputChange, resetValues } = useForm({
    title: '',
    description: '',
    course: '',
    difficulty: '',
    ingredients: [],
    timeEstimate: 3,
    steps: [],
    avatar: '',
    servings: ''
  })
  return (
    <Grid container direction='column' className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <CardHeader sx={{ textAlign: 'center' }} titleTypographyProps={{variant:'h4' }} title="New recipe"/>

          <Grid item xs={12}>
            <Grid container className='centered'>
              <Grid item >
                <CardMedia
                  onClick={() => console.log('img')}
                  component='img'
                  src={allImages.saltys[0]} />
              </Grid>
              <Grid item>
                <Box display='flex' flexDirection={'column'}>
                  <Controls.Input value={values.title} name='title' label='Name' multiline onChange={handleInputChange} />
                  <Controls.Input value={values.description} name='description' label='Description' onChange={handleInputChange} multiline />
                </Box>
              </Grid>

            </Grid>
          </Grid>

          <Grid item className='centered'>
            <Controls.Select
              showNone={false}
              label='Course'
              name='course'
              value={values.course}
              onChange={handleInputChange}
              options={courseOptions}/>

            <Controls.Input
              sx={{ maxWidth: '30px' }}
              type='number'
              label='Servings'
              name='servings'
              value={values.servings}
              onChange={handleInputChange} />

              <Controls.Select
              showNone={false}
              label='Difficulty'
              name='difficulty'
              value={values.difficulty}
              onChange={handleInputChange}
              options={difficultyOptions}/>
          
          </Grid>

          <Grid item className='centered'>
            <Box>
              <Controls.Slider
                sx={{ minWidth: '300px' }}
                name='timeEstimate'
                label='Time'
                min={0}
                max={timeScaleValues.length-1}
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
            <IngredientInput handleInputChange={handleInputChange} values={values} setValues={setValues}/>
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
                <Controls.Button size='small' text='Clear' onClick={resetValues} />
                <Controls.Button sx={{ marginLeft: '10px' }} size='small' text='cancel' onClick={close} />
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