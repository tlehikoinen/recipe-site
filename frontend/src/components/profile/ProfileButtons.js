import React from 'react'
import { CardContent, Grid } from '@mui/material'
import Controls from '../controls/Controls'

const ProfileButtons = () => {
  return (
    <Grid container flexWrap='nowrap' justifyContent={'center'}>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Message' />
        </CardContent>
      </Grid>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Recipes' />
        </CardContent>
      </Grid>
      <Grid item>
        <CardContent>
          <Controls.Button size='small' text='Follow' />
        </CardContent>
      </Grid>
    </Grid>
  )
}

export default ProfileButtons