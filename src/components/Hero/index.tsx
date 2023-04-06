import React from 'react'
import './Hero.scss'

import Robot from '../../assets/images/robot.png'
import Button from 'components/Button/Button'
const Hero: React.FC = () => {
  return (
    <div className="mx">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            <span>Stake</span>House
          </h1>

          <div className="hero-robot-img-media">
            <img src={Robot} alt="" />
          </div>
          <p>
            Stake your BNB & earn daily 9% for 30 days. Stable & profitable
            yield farming DApp with automated users insurance.
          </p>
          <div className="deposit-btn">
            <Button varient="primary">Deposit</Button>
          </div>
        </div>

        <div className="hero-robot-img">
          <img src={Robot} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
