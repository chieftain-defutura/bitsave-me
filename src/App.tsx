import React from 'react'
// import { Routes, Route } from 'react-router-dom'

import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Navigation from 'components/Navigation'
import Card from 'components/Card'
import Footer from 'components/Footer'
import TotalBNB from 'components/TotalBNB'

const App: React.FC = () => {
  return (
    <div className="bg-img-move">
      <Navigation />
      <TotalBNB />
      <Card />
      <Footer />
    </div>
  )
}

export default App
