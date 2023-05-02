import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from 'page'
import Borrow from 'page/borrow'
import Navigation from 'components/Navigation'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </>
  )
}

export default App
