import DepositAndPlan from 'components/DepositsAndPlan'
import Hero from 'components/Hero'
import Navigation from 'components/Navigation'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <DepositAndPlan />
    </div>
  )
}

export default Home
