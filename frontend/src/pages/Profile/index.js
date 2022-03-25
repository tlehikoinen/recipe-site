import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import OwnUserProfile from './OwnUserProfile'
import Contexts from '../../contexts'
import UserErrorBox from '../../components/profile/UserErrorBox'
/*eslint-disable*/
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
}))

const index = () => {
  const classes = useStyles()
  const context = useContext(Contexts.UserContext)
  
  const TestProfile = {
    name: 'asdgtyuwoiplkjsn',
    recipes: ['Yks', 'Kaks', 'Kolme'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    avatar: 'https://picsum.photos/100',
    joinDate: new Date().toLocaleDateString()
  }

  return (
    <>
      { (context.user) ? 
        <Grid container className={classes.root}> 
          <OwnUserProfile context={context} />
        </Grid> :
        <UserErrorBox message="Log in first" />
      }

    </>
  )

}

export default index