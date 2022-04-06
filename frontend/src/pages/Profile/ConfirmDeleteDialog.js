import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Controls from '../../components/controls/Controls'
import UserServices from '../../services/userServices'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
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
      width: '100%',
      textAlign: 'center',
      transformOrigin: 'center',
      '&.Mui-focused': {
        transformOrigin: 'center'
      }
    }
  }
}))

const ConfirmDeleteDialog = (props) => {
  const { open, handleClose } = props

  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const history = useNavigate()

  const deleteUser = async () => {
    const res = await UserServices.deleteUserWithConfirmation({ password: password })
    if (res.status !== 200) {
      setPasswordError(true)
    } else {
      handleClose()
      history('/logout')
    }
  }

  const handleInputChange = (e) => {
    setPassword(e.target.value)
    setPasswordError(false)
  }

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose} >
      <DialogTitle>Delete your account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm with password
        </DialogContentText>
        <Controls.Input
          margin="dense"
          id="password"
          label="Password"
          type="password"
          error={passwordError}
          helperText={passwordError && 'Wrong password'}
          fullWidth
          variant="standard"
          onChange={(e) => handleInputChange(e)}
          value={password}
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button text='Cancel' size='small' onClick={handleClose} />
        <Controls.Button text='Delete' size='small' onClick={deleteUser} />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog