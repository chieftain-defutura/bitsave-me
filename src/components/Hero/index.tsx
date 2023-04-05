import React from 'react'
import Button from 'components/Button'
import './Hero.scss'

import Robot from '../../assets/images/robot.png'
const Hero = () => {
  return (
    <div className="mx">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            <span>Stake</span>House
          </h1>
          <p>
            Stake your BNB & earn daily 9% for 30 days. Stable & profitable
            yield farming DApp with automated users insurance.
          </p>
          <div className="button">
            <Button variant="primary">Deposit</Button>
          </div>
        </div>

        <div className="hero-image">
          <img src={Robot} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
