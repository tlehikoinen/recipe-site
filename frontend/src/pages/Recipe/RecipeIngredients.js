import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  tableRoot: {
    maxWidth: '100%',
    marginTop: '3em'
  }
}))

const RecipeIngredients = ( { ingredients }) => {
  const classes = useStyles()
  return (
    <>
      <TableContainer className={classes.tableRoot} component={Paper}>
        <Typography sx={{ textAlign: 'center' }} variant='h5'>Ingredients</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { ingredients.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.ingredient}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* { ingredients.map(r => (
        <>
          <Typography key={r.id}>{r.ingredient}</Typography>
        </>
      ))} */}
    </>
  )
}

export default RecipeIngredients