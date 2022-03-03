import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Controls from '../../components/controls/Controls'
import UserServices from '../../services/userServices'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    fullWidth: true,
    '& .MuiDialog-container': {
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(12)
      }
    },
    '& .MuiTypography-root': {
      textAlign: 'center'
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center'
    },
    '& label, p': {
      margin: '10px',
      width: '100%',
      textAlign: 'center',
      transformOrigin: 'center',
      '&.Mui-focused': {
        transformOrigin: 'center'
      }
    }
  }
}))

const DescriptionDialog = (props) => {
  const { context, open, handleClose } = props

  const classes = useStyles()
  const [description, setDescription] = useState('')

  useEffect(() => {
    setDescription(context.user.user.description)
  }, [])

  const handleInputChange = (e) => {
    setDescription(e.target.value)
  }

  const updateDescription = async () => {
    console.log(context.user.user.id)
    const res = await UserServices.updateDescription(context.user.user.id, description)
    if (res !== 401) {
      console.log(res.data)
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (res.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      console.log(Object.entries(newUser))
      context.setUser(newUser)
      handleClose()
    }
  }
  return (
    <Dialog className={classes.root} open={open} onClose={handleClose} >
      <DialogTitle>Edit description</DialogTitle>
      <DialogContent>
        <Controls.Input
          name='description'
          fullWidth
          multiline={true}
          onChange={(e) => handleInputChange(e)}
          value={description}
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button text='Cancel' size='small' onClick={handleClose} />
        <Controls.Button text='Update' size='small' onClick={updateDescription} />
      </DialogActions>
    </Dialog>
  )
}

export default DescriptionDialog