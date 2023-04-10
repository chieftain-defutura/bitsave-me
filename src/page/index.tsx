import React from 'react'
import DepositAndPlan from 'components/DepositsAndPlan'
import Hero from 'components/Hero'
import Navigation from 'components/Navigation'
import Card from 'components/Card'
import Footer from 'components/Footer'
import TotalBNB from 'components/TotalBNB'
import StakePlans from 'components/StakePlans'
import Deposits from 'components/Deposits'
import Disclaimer from 'components/Disclaimer'

const Home: React.FC = () => {
  return (
    <div>
      <div className="hero-bg-video">
        <video
          src="https://ik.imagekit.io/2v3vcuerq/stake-house-intro.mp4?updatedAt=1681102315248"
          autoPlay
          loop
          muted
          width="100%"
          height="100%"
        ></video>
        <div className="overlay"></div>
        <div className="hero-bg-content">
          <Navigation />
          <Hero />
        </div>
      </div>

      <div className="bg-img-move">
        <TotalBNB />
        <StakePlans />
        <DepositAndPlan />
        <Deposits />
        <Disclaimer />
        <Card />
        <Footer />
      </div>
    </div>
  )
}

export default Home
