import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  tableRoot: {
    maxWidth: '100%',
    marginTop: '3em'
  }
}))
const RecipeInstructions = ( { instructions }) => {
  const classes = useStyles()

  return (
    <>
      <TableContainer className={classes.tableRoot} component={Paper}>
        <Typography sx={{ textAlign: 'center' }} variant='h5'>Steps</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell>Instruction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructions.map((i, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx+1}</TableCell>
                <TableCell>{i.instruction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RecipeInstructions