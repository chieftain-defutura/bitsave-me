import React from 'react'
import './Hero.scss'
import CoinOne from '../../assets/images/coin-img-1.png'
import CoinTwo from '../../assets/images/coin-img-2.png'
import CoinThree from '../../assets/icons/usdt.png'
import CoinFour from '../../assets/images/coin-img-4.png'
import Robot from '../../assets/images/robot-img.png'
import Button from 'components/Button/Button'

const Hero: React.FC = () => {
  return (
    <div className="hero-wrapper">
      <div className="mx">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              <span>Bit</span>aid
            </h1>
            <p>
              Our innovative staking algorithm allows you to maximize your
              earnings without the need for constant trading or monitoring the
              market. With our user-friendly interface, you can easily lock your
              USDT & BUSD from 30- 360 days and start earning passive income in
              no time. Join us today and unlock the potential of passive income
              with our cutting-edge crypto staking platform.
            </p>
            <div className="deposit-btn">
              <a href="#deposit">
                <Button varient="primary">Deposit</Button>
              </a>
            </div>
          </div>

          <div className="robot-img-content">
            <div className="hero-robot-img">
              <img src={Robot} alt="" />
            </div>

            <div className="coin-rotation">
              <div className="coin-one">
                <img src={CoinOne} alt="" />
              </div>
              <div className="coin-two">
                <img src={CoinTwo} alt="" />
              </div>
              <div className="coin-three usdt-coin">
                <img src={CoinThree} alt="" />
              </div>
              <div className="coin-four">
                <img src={CoinFour} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
