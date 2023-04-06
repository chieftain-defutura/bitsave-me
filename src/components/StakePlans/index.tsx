import React from 'react'
import { IStakePlans } from './StakePlans'
import './StakePlans.scss'
import Button from '../Button/Button'

const StakePlans: React.FC = () => {
  return (
    <div className="stake-plans-wrapper">
      <div className="mx">
        <div className="stake-plans-container">
          <h2>Stake Plans</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate.
          </p>
        </div>

        <div className="stake-plans-grid">
          {IStakePlans.map((f, index) => {
            return (
              <div key={index} className="stake-plans-items">
                <h2>{f.heading}</h2>
                <h6>{f.title}</h6>
                <Button varient="primary">Stake Now</Button>
                <p>{f.price}</p>
                <div className="border"></div>
                <p>{f.dailyPrecentage}</p>
                <div className="border"></div>
                <p>{f.profits}</p>
                <div className="border"></div>
                <p>{f.depositStatus}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StakePlans
