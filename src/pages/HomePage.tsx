import React from 'react'
import DepositAndPlan from 'components/DepositsAndPlan'
import Hero from 'components/Hero'
import Navigation from 'components/Navigation'
import Card from 'components/Card'
import Footer from 'components/Footer'
import TotalBNB from 'components/TotalBNB'
import StakePlans from 'components/StakePlans'
import Deposits from 'components/Deposits'

const Home: React.FC = () => {
  return (
    <div className="bg-img-move">
      <Navigation />

      <Hero />
      <TotalBNB />
      <StakePlans />
      <DepositAndPlan />
      <Deposits />
      <Card />
      <Footer />
    </div>
  )
}

export default Home
