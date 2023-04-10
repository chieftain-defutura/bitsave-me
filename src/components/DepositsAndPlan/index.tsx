import React from 'react'
import Deposit from './Deposit'
import PlanBNB from './PlanBNB'
import './DepositAndPlan.scss'

const DepositAndPlan: React.FC = () => {
  return (
    <div className="deposit-and-plan-container" id="deposit">
      <h1>BNB Stake</h1>
      <div className="container">
        <PlanBNB />
        <Deposit />
      </div>
    </div>
  )
}

export default DepositAndPlan
