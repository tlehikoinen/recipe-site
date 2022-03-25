import React from 'react'
import Dialog from '@mui/material/Dialog'

const index = ( { image, open, handleClose }) => {

  return (
    <Dialog
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      open={open}
      onClose={handleClose}>
      <img
        src={image}
        alt="Imagess" />
    </Dialog>
  )
}

export default index