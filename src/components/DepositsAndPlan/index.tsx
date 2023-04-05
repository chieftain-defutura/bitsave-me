import React from 'react'
import Plan from './Plan'
import Deposit from './Deposit'

import './DepositAndPlan.scss'

const DepositAndPlan = () => {
  return (
    <div className="deposit-and-plan-container">
      <h1>BNB Stake</h1>
      <div className="container">
        <Plan />
        <Deposit />
      </div>
    </div>
  )
}

export default DepositAndPlan
