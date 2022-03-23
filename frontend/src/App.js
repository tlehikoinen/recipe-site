import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from './pages/Todo'
import Info from './pages/Info'
import Login from './pages/Login'
import LogOut from './pages/LogOut'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import UserProfiles from './pages/UserProfiles'
import UserProfile from './pages/UserProfile'
import { Container } from '@material-ui/core'

import Unknown from './components/Unknown'
import {  Footer } from './components/common/'
import NavBar from './components/NavBar'
import './App.css'

import Contexts from './contexts'

import { LightTheme } from './styles/themes'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

import UserServices from './services/userServices'

const App = () => {
  // const [theme, setTheme] = useState(LightTheme)

  // const toggleColorTheme = (event) => {
  //   event.preventDefault()
  //   setTheme((theme === LightTheme) ? DarkTheme : LightTheme)
  // }
  const [user, setUser] = useState(null)
  const userCtx = { user, setUser }

  useEffect(() => {
    //const tokenJson = window.localStorage.getItem('tokenJson')
    const userJson = window.localStorage.getItem('userJson')
    console.log('APP USE EFFECT')
    if (userJson) {
      const user = JSON.parse(userJson)
      //const token = JSON.parse(tokenJson)
      if (user) {
        console.log('user')
        console.log(Object.entries(user))
        UserServices.setToken(user.token)

      }
      setUser(user)
    }
  }, [])

  return (
    <Contexts.UserContext.Provider value={userCtx}>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline/>
        <Container disableGutters maxWidth="xl">
          <NavBar />
          <Routes>
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" element={<UserProfiles />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/" element={<Todo />} />
            <Route path="/*" element={<Unknown />} />
          </Routes>
          <Footer />
        </Container>
      </ThemeProvider>
    </Contexts.UserContext.Provider>

  )
}


export default App