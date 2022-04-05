import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'
import Login from './pages/Login'
import LogOut from './pages/LogOut'
import Profile from './pages/Profile'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import Settings from './pages/Settings'
import SignUp from './pages/SignUp'
import UserProfiles from './pages/UserProfiles'
import UserProfile from './pages/UserProfile'
import { Container } from '@material-ui/core'

import Unknown from './components/Unknown'
import {  Footer } from './components/common/'
import NavBar from './components/NavBar'
import './App.css'

import Contexts from './contexts'

/* eslint-disable-next-line */
import { DarkTheme, LightTheme } from './styles/themes'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

import UserServices from './services/userServices'
import RecipeServices from './services/recipeServices'

const themeOptions = {
  light: LightTheme,
  dark: DarkTheme
}

const App = () => {
  // const [theme, setTheme] = useState(LightTheme)

  // const toggleColorTheme = (event) => {
  //   event.preventDefault()
  //   setTheme((theme === LightTheme) ? DarkTheme : LightTheme)
  // }
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(null)
  const changeTheme = (theme) => {
    setTheme(theme)
  }

  const userCtx = { user, setUser }
  const themeCtx = { theme, changeTheme }

  useEffect(() => {
    const userJson = window.localStorage.getItem('userJson')
    if (userJson) {
      const user = JSON.parse(userJson)
      if (user) {
        themeCtx.changeTheme(user.user.theme)
        UserServices.setToken(user.token)
        RecipeServices.setToken(user.token)
      }
      setUser(user)
    } else {
      const themeInStorage = window.localStorage.getItem('theme')
      if (themeInStorage === '' || themeInStorage === undefined || !themeInStorage) {
        themeCtx.changeTheme('light')
      } else {
        themeCtx.changeTheme(themeInStorage)
      }
    }
  }, [])

  return (
    <Contexts.UserContext.Provider value={userCtx}>
      <Contexts.PageInfoContext.Provider value={themeCtx}>
        {/* <ThemeProvider theme={user?.user?.theme === 'dark' ? DarkTheme : LightTheme}> */}
        <ThemeProvider theme={themeOptions[theme] || LightTheme}>
          <CssBaseline/>
          <Container disableGutters maxWidth='xl'>
            <NavBar />
            <Routes>
              <Route path="/info" element={<Info />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<Recipe />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/users" element={<UserProfiles />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Unknown />} />
            </Routes>
            <Footer />
          </Container>
        </ThemeProvider>
      </Contexts.PageInfoContext.Provider>
    </Contexts.UserContext.Provider>

  )
}


export default App