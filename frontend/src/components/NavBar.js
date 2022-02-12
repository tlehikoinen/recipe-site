/* eslint-disable-next-line */
import React, { useState } from 'react'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'


const pages = [
  { name: 'home', url:'/' },
  { name: 'recipes', url:'/recipes' },
  { name: 'info', url:'/info' }]

const userPages = [
  { name: 'profile', url:'/profile' },
  { name: 'settings', url:'/settings' },
  { name: 'logout', url:'/logout' }
]

const loginPages = [
  { name: 'login', url:'/login' },
  { name: 'sign up', url:'/signup' }
]

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    left: '35%'
  },
  leftItems: {
    '& .MuiInputBase-root': {
      paddingLeft: '10px'
    },
  },
  searchInput: {
    opacity:'0.6',
    padding:'0px 4px',
    marginLeft: '4px',
    fontSize:'0.8rem',
    minWidth: '10%',
    maxWidth: '30%',
    '&:hover':{
      backgroundColor: theme.palette.primary.light,
      borderRadius: '10px'
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }
  },
}))

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null)
  const loggedIn = false

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUserMenu(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUserMenu(null)
  }

  const classes = useStyles()

  return (
    <Paper>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu for navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.url}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant='h5'>Recipes</Typography>
          <InputBase
            className={classes.searchInput}
            placeholder="Search"
            startAdornment={<SearchIcon fontSize="small" />}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link} to={page.url}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', background:'#123' }} />  { /* Forces items in box below to right */ }
          <Box>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenUserMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUserMenu)}
              onClose={handleCloseUserMenu}>
              {
                loggedIn ? (
                  userPages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseUserMenu} component={Link} to={page.url}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>)))
                  : (
                    loginPages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseUserMenu} component={Link} to={page.url}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem> )))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  )
}

export default NavBar