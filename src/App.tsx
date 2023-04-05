import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Navigation from 'components/Navigation'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} />
    </Routes>
  )
}

export default App
