import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '../controls/Button'
import Controls from '../controls/Controls'
import { Grid } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { makeStyles } from '@mui/styles'

const unitOptions = [
  { id: 1, title: 'tsp.' },
  { id: 2, title: 'tbsp.' },
  { id: 2, title: 'ml' },
  { id: 4, title: 'dl' },
  { id: 5, title: 'l' },
  { id: 6, title: 'g' },
  { id: 7, title: 'kg' },
  { id: 8, title: 'pcs.' }
]

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100% !important',
    overflowX: 'hidden !important',
    marginRight: '10px !important',
    '& .MuiTableCell-root:not(.delete-icon)': {
      padding: '0.05em',
      [theme.breakpoints.up('sm')]: {
        padding: '0.5em',
      },
    },
    '& .delete-icon': {
      padding: '0',
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

const IngredientInput = ({ handleInputChange, values, setValues }) => {

  const [biggestRow, setBiggestRow] = useState(1)
  const classes = useStyles()

  const emptyIngredient = { id: biggestRow, ingredient: '', amount: '', unit: '' }

  const addNewRow = () => {
    const newValues = values.ingredients.concat(emptyIngredient)
    setBiggestRow(biggestRow + 1)
    setValues({ ...values, ingredients: newValues })
  }

  const deleteRow = (row) => {
    const newRows = values.ingredients.filter(r => r.id.toString() !== row.id.toString())
    setValues({ ...values, ingredients: newRows })
  }

  return (
    <TableContainer className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell>Ingredient</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody onChange={handleInputChange}>
          {values?.ingredients.map(row => (
            <TableRow key={row.id} className={classes.tablerow}>
              <TableCell style={{ width: '10' }} className='delete-icon'>
                <DeleteIcon onClick={() => deleteRow(row)} />
              </TableCell>
              <TableCell style={{ width: '70%' }}>
                <Controls.Input multiline size='small' fullWidth name={`ingredients_${row.id}_ingredient`} value={row.ingredient} />
              </TableCell>
              <TableCell style={{ width: '20%' }}>
                <Controls.Input size='small' name={`ingredients_${row.id}_amount`} value={row.amount} />
              </TableCell>
              <TableCell style={{ width: '10' }}>
                <Controls.Select
                  size='small'
                  showNone={false}
                  name={`ingredients_${row.id}_unit`}
                  value={row.unit}
                  options={unitOptions}
                  onChange={handleInputChange} />
              </TableCell>
            </TableRow>))}
        </TableBody>

      </Table>
      <Grid item sx={{ display: 'flex', justifyContent: 'right' }}>
        <Button sx={{ margin: '1em 3em 0 0' }} text='add ingredient' size='small' onClick={addNewRow} />

      </Grid>

    </TableContainer>

  )
}

export default IngredientInput