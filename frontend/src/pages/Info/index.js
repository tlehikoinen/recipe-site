import React from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '& a:link': {
      backgroundColor: 'transparent',
      textDecoration: 'none'
    },
    '& a:hover': {
      color: 'red'
    }
  }
}))

const Info = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} sx={{ justifyContent: 'center', mt: '1em' }}>
      <Grid item sx={{ textAlign: 'center' }}>
        <Card>
          <CardContent>
            <Typography variant='body1'>
              Recipe site built with MERN-stack<br /><br />
              Contact:
              <a sx={{ color: 'white' }} href='https://github.com/yellowpasta'><Typography>github.com/yellowpasta</Typography></a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  )
}

export default Info