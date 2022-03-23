import React, { useState, useRef, useEffect } from 'react'
import { CardContent, CardMedia, Dialog, DialogActions, DialogTitle, Grid, Typography } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { makeStyles } from '@mui/styles'
import BlankProfile from './blank_profile.png'
import userServices from '../../services/userServices'

/* eslint-disable */
import Resizer from 'react-image-file-resizer'

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
    '& .BrowseInput': {
      display: 'flex',
      flexDirection: 'column'
    },
    '& .MuiButton-root': {
      minWidth: '100px !important',
    },
    '& .MuiPaper-root': {
      minWidth:'350px',
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

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'file'  // Output type, can be 'base64', 'blob', or 'file'
    )
  })

  // Convert base64 to file
  async function dataUrlToFile(dataUrl, fileName) {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
}

const AvatarDialog = (props) => {
  const { context, open, handleClose } = props
  const classes = useStyles()
  const [file, setFile] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const inputFile = useRef()
  const [displayImgError, setDisplayImgError] = useState('None')
  const [imgError, setImgError] = useState('Image was not supported')

  useEffect(async () => {
    if (context.user.user.avatar.key === '') {
      setAvatar(BlankProfile)
    } else {
      setAvatar(BlankProfile)
      setAvatar(`/api/users/avatars/${context.user.user.id}`)
    }
  }, [])

  const saveAvatar = async () => {
    const res = await userServices.postAvatar(context.user.user.id, file)

    if (res.status !== 400) {
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (res.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      context.setUser(newUser)
      handleClose()
    }
    else {
      console.log(res)
      if (res.data.error) setImgError(res.data.error)
      setDisplayImgError('block')
      setTimeout(() => {
        setDisplayImgError('None')
      }, 2000)
    }
  }

  const onChangeFile = async (e) => {
    try {
      const file = e.target.files[0]
      console.log('FIle size')
      console.log(file)
      if (file.size > 999999) { // 1 MB
        const newFile = await resizeFile(file)  // Resize image
        setFile(newFile)
        setAvatar(URL.createObjectURL(newFile))
      } else {  // No need to resize
        setFile(file)
        setAvatar(URL.createObjectURL(file))
      }

    } catch(err) {
      console.log(err)
    }
  }


  return (
    <Dialog className={classes.root} open={open} onClose={handleClose}>
      <DialogTitle>Change avatar</DialogTitle>
      <Grid container flexDirection='column' justifyContent={'center'} alignItems='center'>
        <Grid item>
          <CardContent >
            <CardMedia sx={{ width:'150px', height:'150px' }}
              component='img'
              src={avatar}/>
          </CardContent>
        </Grid>
        <Grid item className='BrowseInput'>
          <input
            style={{ display: 'none' }}
            ref={inputFile}
            type="file"
            accept="image"
            onChange={(e) => onChangeFile(e)}
          />
          <Controls.Button size='small' sx={{ marginBottom:'30px' }} text='Browse' onClick={() => inputFile.current.click()}/>
          <Typography display={displayImgError} color='error'>{imgError}</Typography>
        </Grid>
      </Grid>

      <DialogActions>
        <Controls.Button text='Cancel' size='small' onClick={handleClose} />
        <Controls.Button text='Save' size='small' onClick={saveAvatar} />
      </DialogActions>
    </Dialog>
  )
}

export default AvatarDialog