import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from 'page'
import Borrow from 'page/borrow'
import Navigation from 'components/Navigation'
import Buy from 'page/buy'
import Sell from 'page/sell'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </>
  )
}

export default App
