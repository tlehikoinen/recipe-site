import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const Unknown = () => {
  return (
    <Grid container sx={{ mt:'1em', display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <Card>
          <CardContent>
            <Typography>Page not found</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default Unknown

