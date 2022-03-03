import { CardContent, Grid } from '@mui/material'
import React from 'react'
import Controls from '../../components/controls/Controls'

const LogInBtns = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Edit' />
        </CardContent>
      </Grid>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Recipes' />
        </CardContent>
      </Grid>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Delete' color='error' />
        </CardContent>
      </Grid>
    </Grid>
  )
}

export default LogInBtns