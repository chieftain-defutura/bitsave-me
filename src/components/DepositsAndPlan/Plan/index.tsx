import React from 'react'
import Button from 'components/Button'

import './Plan.scss'
const Plan = () => {
  return (
    <div className="plan-container">
      <div className="plan-dropdown">
        <h3>PLAN</h3>
        <select name="" id="">
          <option value="">30days</option>
          <option value="">60days</option>
          <option value="">90days</option>
        </select>
      </div>
      <div className="profit">
        <div className="profit-content">
          <h3>daily profit</h3>
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
          <select name="" id="">
            <option value="">BUSD</option>
            <option value="">USD</option>
          </select>
        </div>
        <div className="balance">
          <p>Balance:0.00002</p>
        </div>
      </div>
      <div className="max-container">
        <p>0</p>
        <h4>Max</h4>
      </div>
      <Button variant="primary">Stake</Button>
      <div className="min-max">
        <p>Min: 0.01, Max:100</p>
      </div>
    </div>
  )
}

export default Plan
