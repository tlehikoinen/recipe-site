import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import '@fontsource/roboto/300.css'
import { AccessAlarm } from '@mui/icons-material'
import Button from '@mui/material/Button'


export const NavBar = () => {
  console.log('rendering navbar')
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/info">Info</Link>
      </li>

      <li>
        <AccessAlarm></AccessAlarm>
      </li>
      <li>
        <Button variant="contained">Hello</Button>
      </li>

    </nav>

  )
}

