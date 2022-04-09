import React, { useEffect, useState } from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Controls from '../../components/controls/Controls'

const useStyles = makeStyles((theme) => ({
  tableRoot: {
    maxWidth: '100%',
    marginTop: '1em',
    '& .MuiTable-root': {
      marginTop: '2em'
    },
  },
  ingredientsHeader: {
    marginTop: '2em',
    display: 'flex',
    position: 'relative',
    flexWrap: 'nowrap',
    '& .MuiFormControl-root': {
      maxWidth: '100px',
    },
    '& .MuiTypography-root': {
      marginLeft: '1em'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      '& .MuiTypography-root': {
        marginLeft: '0'
      },
    }
  }
}))

const RecipeIngredients = ( { ingredients, servings }) => {
  const classes = useStyles()

  const [portions, setPortions] = useState(0)
  const [scaledIngredients, setScaledIngredients] = useState([])
  useEffect(() => {
    setPortions(servings)
    setScaledIngredients(ingredients)
  }, [])

  const scalePortions = (e) => {
    setPortions(e.target.value)
    const scaled = ingredients.map(i => ({ ...i, amount:  (i.amount / servings) * e.target.value } ))
    setScaledIngredients(scaled)
  }

  return (
    <>
      <TableContainer className={classes.tableRoot} component={Paper}>
        <Grid container className={classes.ingredientsHeader}>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }} variant='h5'>Ingredients</Typography>
          </Grid>
          <Grid item sx={{ position: 'absolute' , right: '10%' }}>
            <Controls.Input value={portions} onChange={scalePortions} label='Servings' type='number' />
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { scaledIngredients.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.ingredient}</TableCell>
                <TableCell>{r.amount}</TableCell>
                <TableCell>{r.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RecipeIngredients