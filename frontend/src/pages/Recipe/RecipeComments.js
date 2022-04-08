import React, { useContext } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import Context from '../../contexts'
import recipeServices from '../../services/recipeServices'
const useStyles = makeStyles(() => ({
  tableRoot: {
    maxWidth: '100%',
    marginTop: '3em'
  }
}))
const RecipeComments = ({ comments, recipeCtx }) => {
  const classes = useStyles()

  const deleteComment = async (id) => {
    const response = await recipeServices.deleteComment(id)
    if (response.status === 202) {
      const newRecipes = recipeCtx.recipes.map(r => r.id === response.data.recipe.id ? response.data.recipe : r)
      recipeCtx.setRecipes(newRecipes)
    }
  }

  const userContext = useContext(Context.UserContext)
  return (
    <TableContainer className={classes.tableRoot} component={Paper}>
      <Typography sx={{ textAlign: 'center' }} variant='h5'>Comments</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Message</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((c, idx) => (
            <TableRow key={idx}>
              <TableCell>{c.username}</TableCell>
              <TableCell>{c.comment}</TableCell>
              <TableCell align='right' >
                {c.username === userContext?.user?.user.username &&
                  <IconButton onClick={() => deleteComment(c.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecipeComments