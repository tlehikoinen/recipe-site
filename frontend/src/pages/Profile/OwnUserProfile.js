import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Controls from '../../components/controls/Controls'
import BlankProfile from './blank_profile.png'
import { useDialog } from '../../components/useDialog'
import AvatarDialog from './AvatarDialog'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import DescriptionDialog from './DescriptionDialog'
import ImageWithDialog from '../../components/images/ImageWithDialog'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '400px',
    '& .MuiButton-root': {
      minWidth: '80px',
    },
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      marginTop: '4px',
      height: '125px',
      width: '125px'
    },
    '& .MuiTypography-body2': {
      opacity: '0.6'
    },
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2),
    },
  },
  editProfile: {
    '& .MuiButton-root': {
      minWidth: '120px !important',
    },
  },
  dialog: {
    '& .MuiDialog-container': {
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(12)
      }
    },
    '& .MuiTypography-root': {
      textAlign: 'center',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center'
    },
    '& label': {
      width: '100%',
      textAlign: 'center',
      transformOrigin: 'center',
      '&.Mui-focused': {
        transformOrigin: 'center'
      }
    }
  }
}))

const OwnUserProfile = ({ context }) => {

  const [avatar, setAvatar] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  const deleteDialog = useDialog()
  const descriptionDialog = useDialog()
  const avatarDialog = useDialog()

  useEffect(async () => {
    if (context.user.user.avatar.key === '') {
      setAvatar(BlankProfile)
    } else {
      setAvatar(BlankProfile)
      setAvatar(`/api/users/avatars/${context.user.user.id}`)
    }
  }, [context])

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      { !showEdit?
        <CardContent>
          <Grid container>
            <Grid item xs={5}>
              <CardContent>
                <ImageWithDialog avatar={avatar} />
              </CardContent>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box display='flex' flexDirection={'column'}>
                  <Typography variant='h6'>{context.user.user.username}</Typography>
                  <Typography variant='body2'>{`Join Date ${context.user.user.joinDate.split('T')[0]}`}</Typography>
                  <Typography style={{ wordWrap: 'break-word' }} variant='body1'>{context.user.user.description}</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
          <Grid container flexWrap='nowrap' justifyContent={'center'}>
            <Grid item>
              <CardContent>
                <Controls.Button size='small' text='Edit' onClick={() => setShowEdit(true)} />
              </CardContent>
            </Grid>
            <Grid item>
              <CardContent>
                <Controls.Button size='small' text='Recipes' disabled={context.user.user.recipes.length === 0} component={Link} to={`/recipes/?user=${context.user.user.username}`} />
              </CardContent>
            </Grid>
            <Grid item>
              <CardContent>
                <Controls.Button size='small' text='Delete' onClick={deleteDialog.handleOpen} color='error' />
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
        :
        <CardContent className={classes.editProfile}>
          <Grid container spacing={3} flexDirection='column' alignItems="center">
            <Grid item>
              <Typography variant='h4' textAlign='center'>Edit profile</Typography>
            </Grid>
            <Grid item>
              <Controls.Button size='small' text="Description" onClick={descriptionDialog.handleOpen} />
            </Grid>
            <Grid item>
              <Controls.Button size='small' text="Avatar" onClick={avatarDialog.handleOpen} />
            </Grid>
            <Grid item>
              <Controls.Button size='small' text="Back" onClick={() => setShowEdit(false)} />
            </Grid>

          </Grid>
        </CardContent>
      }
      <div className={classes.dialog}>
        <ConfirmDeleteDialog open={deleteDialog.open} handleClose={deleteDialog.handleClose} />
        <DescriptionDialog context={context} open={descriptionDialog.open} handleClose={descriptionDialog.handleClose} />
        <AvatarDialog context={context} open={avatarDialog.open} handleClose={avatarDialog.handleClose} userId={avatar} />
      </div>
    </Card>

  )
}

OwnUserProfile.propTypes = {
  UserProfile: PropTypes.object
}

export default OwnUserProfile