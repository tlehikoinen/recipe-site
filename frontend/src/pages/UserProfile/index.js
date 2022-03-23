import React, { useContext, useEffect, useState } from 'react'
import useStyles from './styles.js'
import { useParams } from 'react-router-dom'
import Controls from '../../components/controls/Controls'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import BlankProfile from '../Profile/blank_profile.png'

import Contexts from '../../contexts'
import userServices from '../../services/userServices'

const index = () => {
  const classes = useStyles()
  const [avatar, setAvatar] = useState(null)
  const [user, setUser] = useState(null)
  const params = useParams()
  //const history = useNavigate()

  const context = useContext(Contexts.UserContext)

  useEffect(async () => {
    const res = await userServices.getUser(params.id)
    if (res.data !== null) {
      // if(res.data.username === context.user?.user.username) {
      //   history('/profile')
      // } else {
      //   console.log('not own profile')
      // }
      if (res.data.avatar.key !== '') {
        setAvatar(`/api/users/avatars/${res.data.id}`)
      } else {
        setAvatar(BlankProfile)
      }
      setUser(res.data)
    } else {
      setUser(false)
    }
  }, [])

  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        {user === null ?  // user is null at start, render empty so "User not found" is not shown at load
          <>
          </>
          : user ?
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <CardContent>
                    <CardMedia
                      component='img'
                      src={avatar} />
                  </CardContent>
                </Grid>
                <Grid item xs={6}>
                  <CardContent>
                    <Box display='flex' flexDirection={'column'}>
                      <Box>
                      </Box>
                      <Typography variant='h6'>{user.username}</Typography>
                      <Typography variant='body2'>{`Join Date ${user.joinDate.split('T')[0]}`}</Typography>
                      <Typography variant='body1'>{user.description}</Typography>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
              <Grid container flexWrap='nowrap' justifyContent={'center'}>
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' text='Message' disabled={context.user ? false : true}/>
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' text='Recipes' />
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' text='Follow' disabled={context.user ? false : true}/>
                  </CardContent>
                </Grid>
              </Grid>
            </CardContent>
            :
            <CardContent>
              <Typography variant='h5'>User not found</Typography>
            </CardContent>
        }
      </Card>
    </Grid>
  )
}

export default index