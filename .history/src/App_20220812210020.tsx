import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './page/Main'

function App() {
  return (
    <div>
      <header></header>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
