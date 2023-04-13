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
              <span>Bit</span>Save
            </h1>
            <p>
              Stake your USDT, BUSD & earn 0.5% to 3% daily for 30 -120 days
              with Bitsave. Bitsave is managed by a group of professional
              traders who use their extensive expertise and advanced trading
              bots to navigate the complex cryptocurrency market. Join the 10%
              profitable traders in the crypto industry and make passive income.
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
