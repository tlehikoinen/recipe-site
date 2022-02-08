import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Todo from './components/Todo'
import Info from './components/Info'
import Unknown from './components/Unknown'
import { NavBar, Footer } from './components/common/'
import './App.css'


const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/" element={<Todo />} />
        <Route path="/*" element={<Unknown />} />
      </Routes>
      <Footer />
    </div>
  )
}


export default App