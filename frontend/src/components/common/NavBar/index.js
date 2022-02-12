import React, { useState } from 'react'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

import { PathSelections } from './PathSelections.js'
import { UserMenu } from './UserMenu.js'
import { Logins } from './Logins.js'

/* eslint-disable-next-line */
export const NavBar = ({ currentTheme, toggleTheme }) => {
/* eslint-disable-next-line */
  const [loggedIn, setLoggedIn] = useState(false)


  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PathSelections />
          {loggedIn ?
            <UserMenu /> : <Logins />
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

