import React, { useContext, useState } from 'react'
import { AppBar, Box, Button, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import Contexts from '../contexts'


const pages = [
  { name: 'home', url:'/' },
  { name: 'recipes', url:'/recipes' },
  { name: 'users', url: '/users' },
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

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUserMenu, setAnchorElUserMenu] = useState(null)

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

  //const classes = useStyles()

  const { user } = useContext(Contexts.UserContext)

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
          <Typography
            sx={{ textDecoration: 'none', boxShadow: 'none' }}
            variant="h5"
            component={Link}
            to="/"
            color="textPrimary">
              Recipes
          </Typography>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
          </Grid>

          <Box sx={{ flexGrow: 1, display: 'flex' }} />  { /* Forces items in box below to right */ }
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
                user ? (
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