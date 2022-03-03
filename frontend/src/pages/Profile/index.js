import React, { useContext } from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import UserProfile from './UserProfile'
import Contexts from '../../contexts'
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
          <UserProfile context={context} />
        </Grid> :
        <div>Nothiig</div>
      }

    </>
  )

}

export default index