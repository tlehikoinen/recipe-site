import React, { useState  } from 'react'
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

export const useForm = (initialValues) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Uncheck radiobox on double click
    if (name === 'radioSelection' && values.radioSelection === value) {
      setValues({ ...values, [name]: '' })
    } else {
      setValues({ ...values, [name]:value })
    }
  }

  const [values, setValues] = useState(initialValues)
  return {
    values,
    setValues,
    handleInputChange
  }
}
