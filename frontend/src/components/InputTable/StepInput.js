import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Button from '../controls/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Controls from '../controls/Controls'
import { findBiggestIdInField } from './inputHelpers'

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

const StepInput = ({ handleInputChange, values, setValues }) => {

  const [biggestRow, setBiggestRow] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    setBiggestRow(findBiggestIdInField(values, 'steps') +1)
  }, [])

  const emptyStep = { id: biggestRow, instruction: '' }

  const addNewRow = () => {
    const newValues = values.steps.concat(emptyStep)
    setBiggestRow(biggestRow + 1)
    setValues({ ...values, steps: newValues })
  }

  const deleteRow = (row) => {
    const newRows = values.steps.filter(r => r.id.toString() !== row.id.toString())
    setValues({ ...values, steps: newRows })
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
                <DeleteIcon onClick={() => deleteRow(row)} />
              </TableCell>
              <TableCell>
                <Typography>{idx + 1}</Typography>
              </TableCell>
              <TableCell>
                <Controls.Input fullWidth multiline size='small' name={`steps_${row.id}_instruction`} value={row.instruction} />
              </TableCell>
            </TableRow>))}
        </TableBody>

      </Table>
      <Grid sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button sx={{ margin: '1em 3em 0 0' }} text='add step' size='small' onClick={addNewRow} />
      </Grid>

    </TableContainer>

  )
}

export default StepInput