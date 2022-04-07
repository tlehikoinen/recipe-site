import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { makeStyles } from '@mui/styles'
import Input from '../../components/controls/Input'

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

const CommentDialog = (props) => {
  const { open, handleClose, values, handleInputChange, commentDialogError, action, title, submitBtnText } = props
  const classes = useStyles()

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose} >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Input name='comment' multiline text={values} onChange={handleInputChange} />
        { commentDialogError && <Typography color='error'>{commentDialogError}</Typography> }


      </DialogContent>
      <DialogActions>
        <Controls.Button text='Cancel' size='small' onClick={handleClose} />
        <Controls.Button text={submitBtnText} size='small' onClick={action} />
      </DialogActions>
    </Dialog>
  )
}

export default CommentDialog