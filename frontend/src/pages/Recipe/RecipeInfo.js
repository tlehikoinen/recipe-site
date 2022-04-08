import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'

const RecipeInfo = ({ recipe, type }) => {
  const [display, setDisplay] = React.useState(null)
  const history = useNavigate()

  useEffect(() => {
    if (type === 'xs') {
      setDisplay({ xs: 'flex', sm: 'none' })
    } else {
      setDisplay({ xs: 'none', sm: 'flex' })
    }
  }, [])

  const navigateToProfile = () => {
    history(`/users/${recipe.user.id}`)

  }

  return (
    <Grid container spacing={2} direction='row' sx={{ marginTop: '1px', justifyContent: 'center', display: display }}>
      <Grid item>
        {recipe.user ?
          <Typography
            sx={{ '&:hover': { cursor: 'pointer' } }}
            onClick={navigateToProfile}><span style={{ fontWeight: 'bold' }}>User:</span> {!recipe.user ? 'Anonymous' : recipe.user?.username}</Typography>
          :
          <Typography><span style={{ fontWeight: 'bold' }}>User:</span> {!recipe.user ? 'Anonymous' : recipe.user?.username}</Typography>
        }
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