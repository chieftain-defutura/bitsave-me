import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from 'page'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
