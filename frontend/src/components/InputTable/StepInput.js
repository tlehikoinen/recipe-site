/* eslint-disable */
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Grid, Input, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { IconButton } from '@mui/material'
import Button from '../controls/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import Controls from '../controls/Controls'

const unitOptions = [
  { id: 1, title: 'tsp.' },
  { id: 2, title: 'tbsp.' },
  { id: 2, title: 'ml' },
  { id: 4, title: 'dl' },
  { id: 5, title: 'l' },
  { id: 6, title: 'g' },
  { id: 7, title: 'kg' }
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100% !important',
    marginRight: '10px',
    '& .MuiTableCell-root': {
      padding: '1px'
    },
    '& .MuiFormControl-root': {
      marginTop: 0
    },
    marginTop: theme.spacing(3),
  },
  tablerow: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.75em',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1em'
      },
    }
  }
}))


const createData = (id, ingredient, amount, unit) => {
  return { id, ingredient, amount, unit }
}

const StepInput = ({ handleInputChange, values, setValues }) =>  {

  const [biggestRow, setBiggestRow] = useState(1)
  const classes = useStyles()

  const emptyStep = { id: biggestRow, instruction: '' }

  const addNewRow = () => {
    const newValues = values.steps.concat(emptyStep)
    setBiggestRow(biggestRow+1)
    setValues({ ...values, steps: newValues })
  }

  const deleteRow = (row) => {
    const newRows = values.steps.filter(r => r.id.toString() !== row.id.toString())
    setValues({ ...values, steps: newRows})
  }

  return (
  <TableContainer className={classes.root}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left" />
          <TableCell>Step</TableCell>
          <TableCell>Instruction</TableCell>
        </TableRow>
      </TableHead>
      <TableBody onChange={handleInputChange}>
        {values?.steps.map((row, idx) => (
          <TableRow className={classes.tablerow} key={row.id}>
            <TableCell className={classes.selectTableCell}>
              <DeleteIcon onClick={() => deleteRow(row)}/>
            </TableCell>
            <TableCell>
              <Typography>{idx+1}</Typography>
            </TableCell>
            <TableCell>
              <Controls.Input fullWidth multiline size='small' name={`steps_${row.id}_instruction`} value={row.instruction} />
            </TableCell>
          </TableRow> )) }
      </TableBody>

    </Table>
    <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button sx={{ margin: '20px 20px 20px 0' }} text='add step' size='small' onClick={addNewRow} />

    </Grid>

  </TableContainer>

  )
}

export default StepInput