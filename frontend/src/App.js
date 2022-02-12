import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from './pages/Todo'
import Info from './pages/Info'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Container } from '@material-ui/core'

import Unknown from './components/Unknown'
import {  Footer } from './components/common/'
import NavBar from './components/NavBar'
import './App.css'

import { LightTheme } from './styles/themes'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

const App = () => {
  // const [theme, setTheme] = useState(LightTheme)

  // const toggleColorTheme = (event) => {
  //   event.preventDefault()
  //   setTheme((theme === LightTheme) ? DarkTheme : LightTheme)
  // }

  return (

    <ThemeProvider theme={LightTheme}>
      <CssBaseline/>
      <Container disableGutters maxWidth="xl">
        <NavBar />
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Todo />} />
          <Route path="/*" element={<Unknown />} />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>

  )
}


export default App