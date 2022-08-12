import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './page/Auth'
import Main from './page/Main'

function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
