import React from 'react'
import DepositAndPlan from 'components/DepositsAndPlan'
import Hero from 'components/Hero'
import Navigation from 'components/Navigation'
import Card from 'components/Card'
import Footer from 'components/Footer'
import TotalBNB from 'components/TotalBNB'

const Home = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <TotalBNB />
      <DepositAndPlan />
      <Card />
      <Footer />
    </div>
  )
}

export default Home
