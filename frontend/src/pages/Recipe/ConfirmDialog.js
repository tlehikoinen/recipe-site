import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-container': {
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: theme.spacing(10),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(14)
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

const ConfirmDialog = (props) => {
  const { open, handleClose, action } = props

  const classes = useStyles()

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose} >
      <DialogTitle>Delete Recipe?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleted recipe can not be restored
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Controls.Button text='Cancel' size='small' onClick={handleClose} />
        <Controls.Button text='Delete' size='small' onClick={action} />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog