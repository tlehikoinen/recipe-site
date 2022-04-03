import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const RecipeInfo = ({ recipe, type }) => {
  const [display, setDisplay] = React.useState(null)
  useEffect(() => {
    if (type === 'xs') {
      setDisplay({ xs: 'flex', sm: 'none' })
    } else {
      setDisplay({ xs: 'none', sm: 'flex' })
    }
  }, [])
  return (
    <Grid container spacing={2} direction='row' sx={{ marginTop: '1px', justifyContent: 'center', display: display }}>
      <Grid item>
        <Typography><span style={{ fontWeight: 'bold' }}>User:</span> {!recipe.user ? 'Anonymous' : recipe.user?.username}</Typography>
      </Grid>
      <Grid item>
        <Typography>Likes: {recipe.likers.length}</Typography>
      </Grid>
      <Grid item>
        <Typography>Time: {`${recipe.timeEstimate.value} ${recipe.timeEstimate.unit}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default RecipeInfo