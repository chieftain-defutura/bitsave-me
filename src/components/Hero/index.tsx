import React from 'react'
import './Hero.scss'
import CoinOne from '../../assets/images/coin-img-1.png'
import CoinTwo from '../../assets/images/coin-img-2.png'
import CoinThree from '../../assets/images/coin-img-3.png'
import CoinFour from '../../assets/images/coin-img-4.png'
import Robot from '../../assets/images/robot-img.png'
import Button from 'components/Button/Button'
const Hero: React.FC = () => {
  return (
    <div className="mx">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            <span>Stake</span>House
          </h1>

          <div className="robot-img-content-media">
            <div className="hero-robot-img-media">
              <img src={Robot} alt="" />
            </div>
            <div className="coin-rotation-media">
              <div className="coin-one">
                <img src={CoinOne} alt="" />
              </div>
              <div className="coin-two">
                <img src={CoinTwo} alt="" />
              </div>
              <div className="coin-three">
                <img src={CoinThree} alt="" />
              </div>
              <div className="coin-four">
                <img src={CoinFour} alt="" />
              </div>
            </div>
          </div>

          <p>
            Stake your BNB & earn daily 9% for 30 days. Stable & profitable
            yield farming DApp with automated users insurance.
          </p>
          <div className="deposit-btn">
            <Button varient="primary">Deposit</Button>
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
            <div className="coin-three">
              <img src={CoinThree} alt="" />
            </div>
            <div className="coin-four">
              <img src={CoinFour} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
