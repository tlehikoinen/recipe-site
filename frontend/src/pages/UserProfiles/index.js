import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { makeStyles } from '@mui/styles'
import SearchBox from '../../components/SearchBox'
import Contexts from '../../contexts'
import CommonProfile from '../../components/CommonProfile'
import userServices from '../../services/userServices'
import BackToTop from '../../components/BackToTop'
import { useForm } from '../../components/useForm'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    '& .backToTopBtn': {
      margin: 'auto',
      bottom: '50px',
      marginRight: '-300px',
      [theme.breakpoints.up(480)]: {
        marginRight: '-400px',
      }
    },
    '& .MuiPaper-root': {
      marginTop: '20px',
    },
  },
  inputContainer: {
    marginTop: 8,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TextField: {
    textAlign: 'right',
    marginTop: 10
  }
}))

const index = () => {

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const context = useContext(Contexts.UserContext)
  const classes = useStyles()

  const { values, handleInputChange } = useForm({ searchUsers: '' })

  useEffect(() => {
    let mount = true
    const fetchUsers = async () => {
      const users = await userServices.getUsers()
      if (mount) {
        setUsers(users)
        setFilteredUsers(users)
        const scrollPosition = sessionStorage.getItem('scrollPositionUserProfiles')
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition))
          sessionStorage.removeItem('scrollPositionUserProfiles')
        }
      }
    }
    fetchUsers()

    return () => {
      mount = false
    }

  }, [])

  useEffect(() => {
    const result = users.filter(user => user.username.toLowerCase().includes(values.searchUsers.toLowerCase()))
    setFilteredUsers(result)
  }, [values.searchUsers])

  const handleClick = () => {
    sessionStorage.setItem('scrollPositionUserProfiles', window.pageYOffset)
  }

  return (
    <Grid className={classes.root} container>
      <SearchBox name="searchUsers" label="Search users" value={values.searchUsers} onChange={handleInputChange}/>
      <BackToTop />
      {
        filteredUsers?.map(u => (
          <Grid item key={u.id} xs={12} align="center">
            <CommonProfile  user={u}>
              <Box display="flex" flexDirection="row" justifyContent='space-evenly' onClick={handleClick}>
                <Controls.Button size="small" text="Profile" component={Link} to={context.user?.user.id === u.id ? '/profile' : `/users/${u.id}`} />
                <Controls.Button disabled={u.recipes.length === 0}size="small" text="Recipes" component={Link} to={`/recipes/?user=${u.username}`} />
              </Box>
            </CommonProfile>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default index