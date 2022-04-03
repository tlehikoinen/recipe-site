import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root':  {
      margin: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(1),
      position:'relative',
      align: 'inherit'
    },
  }
}))

export const Form = (props) => {
  const classes = useStyles()

  const { onSubmit } = props

  return (
    <form onSubmit={onSubmit} className={classes.root} width="100%">
      {props.children}
    </form>
  )
}

export const useForm = (initialValues, validationData) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // onClick listener on radiogroup calls this function twice, first time with undefined values, return in this case
    if (name === undefined) {
      return
    }
    if (validationData !== undefined) {
      clearValidations(name)
    }

    // Uncheck radiobox on double click
    if (name === 'radioSelection' && values.radioSelection === value) {
      setValues({ ...values, [name]: '' })
    // For array data previous data is parsed and new data is appended to it
    } else if (name.startsWith('ingredients_')) {
      const [table, row, type] = name.split('_')
      const newData = values.ingredients.find(f => f.id.toString() === row.toString())
      const newRow = { ...newData, [type]: value }
      const newArray = values.ingredients.map(i => i.id.toString() === row.toString() ? newRow : i)
      setValues({ ...values, [table]:newArray })
    } else if (name.startsWith('steps_')) {
      const [table, row, type] = name.split('_')
      const newData = values.steps.find(f => f.id.toString() === row.toString())
      const newRow = { ...newData, [type]: value }
      const newArray = values.steps.map(i => i.id.toString() === row.toString() ? newRow : i)
      setValues({ ...values, [table]:newArray })
    } else {
      setValues({ ...values, [name]:value })
    }
  }
  const clearValidations = (name) =>  {
    const newValidationData = { ...validation, [name]: { ...validation[name], error: false } }
    setValidation(newValidationData)
  }

  const [values, setValues] = useState(initialValues)
  const [validation, setValidation] = React.useState(validationData)
  const originalValues = initialValues
  const resetValues = () => {
    setValues(originalValues)
  }
  return {
    values,
    setValues,
    handleInputChange,
    resetValues,
    validation,
    setValidation
  }
}
