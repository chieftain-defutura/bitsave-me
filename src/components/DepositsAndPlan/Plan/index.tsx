import React from 'react'
import './Plan.scss'
import Button from 'components/Button/Button'

const Plan: React.FC = () => {
  return (
    <div className="card-1">
      <div className="plan-container">
        <div className="plan-dropdown">
          <h3>PLAN</h3>
          <select name="" id="" className="plan-select">
            <option value="">30days</option>
            <option value="">60days</option>
            <option value="">90days</option>
          </select>
        </div>
        <div className="profit">
          <div className="profit-content">
            <h3>Daily profit</h3>
            <h1>
              <span>9%</span>
            </h1>
          </div>
          <div className="profit-content">
            <h3>Total profit</h3>
            <h1>
              <span>170%</span>
            </h1>
          </div>
        </div>
        <div className="balance-container">
          <div className="busd-dropdown">
            <select name="" id="" className="busd-select">
              <option value="">BUSD</option>
              <option value="">USD</option>
            </select>
          </div>
          <div className="balance">
            <p>
              <span>Balance</span>: 0.00000
            </p>
          </div>
        </div>
        <div className="max-container">
          <p>0</p>
          <h4>Max</h4>
        </div>
        <div className="stake-btn">
          <Button varient="primary">Stake</Button>
        </div>
        <div className="min-max">
          <p>
            Min: <span>0.01</span> , Max: <span>100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Plan
