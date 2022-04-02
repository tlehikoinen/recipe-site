import React from 'react'
import { CardMedia } from '@mui/material'
import { useDialog } from '../../useDialog'
import ImageDialog from '../ImageDialog'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      boxShadow: '1px 2px 1px 2px'
    }
  }
}))

const index = ({ avatar, ...rest }) => {
  const { open, handleOpen, handleClose } = useDialog()

  const classes = useStyles()

  return (
    <>
      <CardMedia
        className={classes.root}
        onClick={() => handleOpen(true)}
        component='img'
        src={avatar}
        {...rest} />
      <ImageDialog image={avatar} open={open} handleClose={handleClose} />
    </>
  )
}

export default index