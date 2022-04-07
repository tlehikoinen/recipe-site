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
import recipeServices from './services/recipeServices'

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

  const [recipes, setRecipes] = useState(null)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(null)
  const changeTheme = (theme) => {
    setTheme(theme)
  }

  const recipeCtx = { recipes, setRecipes }
  const userCtx = { user, setUser }
  const themeCtx = { theme, changeTheme }

  useEffect(() => {
    let mount = true
    // Fetch recipes at first load
    const getRecipes = async () => {
      const response = await recipeServices.getRecipes()

      if (mount) {
        recipeCtx.setRecipes(response)
      }
    }
    getRecipes()

    const userJson = window.localStorage.getItem('userJson')
    if (userJson) {
      const parsedUser = JSON.parse(userJson)
      console.log(Object.entries(parsedUser))
      if (parsedUser) {
        themeCtx.changeTheme(parsedUser.user.theme)
        UserServices.setToken(parsedUser.token)
        RecipeServices.setToken(parsedUser.token)
      }
      setUser(parsedUser)
    } else {
      const themeInStorage = window.localStorage.getItem('theme')
      if (themeInStorage === '' || themeInStorage === undefined || !themeInStorage) {
        themeCtx.changeTheme('light')
      } else {
        themeCtx.changeTheme(themeInStorage)
      }
    }

    return () => {
      mount = false
    }
  }, [])

  return (
    // Halt rendering until user and recipes are in context.
    // Prevents context to be null when filtering recipes or other data
    (recipeCtx.recipes) ? <Contexts.UserContext.Provider value={userCtx}>
      <Contexts.PageInfoContext.Provider value={themeCtx}>
        <Contexts.RecipeContext.Provider value={recipeCtx}>
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
        </Contexts.RecipeContext.Provider>
      </Contexts.PageInfoContext.Provider>
    </Contexts.UserContext.Provider>
      :
      <div>
        loading
      </div>

  )
}


export default App