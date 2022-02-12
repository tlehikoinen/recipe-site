import React, { useState  } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    // position: 'absolute', left: '50%',
    // transform: 'translate(-50%)',

    '& .MuiFormControl-root': {
      // width:'50%',
      margin: theme.spacing(1),
      // left: '25%'
    },
    '& .MuiButton-root':  {
      margin: theme.spacing(1),
      marginRight: theme.spacing(1),
      // left: '25%'
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(1),
      position:'relative',
      // left: '25%',
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
    setValues({ ...values, [name]:value })
  }

  const [values, setValues] = useState(initialValues)
  return {
    values,
    setValues,
    handleInputChange
  }
}
