import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import Controls from '../../components/controls/Controls'
import { makeStyles } from '@mui/styles'
import SearchBox from '../../components/SearchBox'
import Contexts from '../../contexts'
import CommonProfile from '../../components/CommonProfile'
import userServices from '../../services/userServices'
/* eslint-disable-next-line */

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
    }
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
  const [searchText, setSearchText] = useState('')
  const [showButton, setShowButton] = useState(false)
  const context = useContext(Contexts.UserContext)
  const classes = useStyles()

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    })
  }

  useEffect( async () => {
    const users = await userServices.getUsers()
    setUsers(users)
    setFilteredUsers(users)
    window.addEventListener('scroll', handleScroll)
    const scrollPosition = sessionStorage.getItem('scrollPosition')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem('scrollPosition')
    } else {
      window.scrollTo(0,0)
    }
    return () => {
      console.log('removing')
      window.removeEventListener('scroll')
    }
  }, [])


  useEffect(() => {
    const result = users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredUsers(result)
  }, [searchText])

  const handleClick = () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset)
  }


  return (
    <Grid className={classes.root} container>
      <SearchBox setText={setSearchText}/>
      {showButton && <Controls.Button onClick={scrollToTop} className='backToTopBtn' text="Top" sx={{ position: 'fixed' }}/>}
      {
        filteredUsers.map(u => (
          <Grid item key={u.id} xs={12} align="center">
            <CommonProfile  user={u}>
              <Box display="flex" flexDirection="row" justifyContent='space-evenly' onClick={handleClick}>
                <Controls.Button size="small" text="Profile" component={Link} to={context.user?.user.id === u.id ? '/profile' : `/users/${u.id}`} />
                <Controls.Button size="small" text="Recipes" component={Link} to={`/users/${u.id}`} />
              </Box>
            </CommonProfile>
          </Grid>
        ))
      }
    </Grid>


  )
}

export default index