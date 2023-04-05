import Button from 'components/Button'
import React from 'react'
import './Deposit.scss'
const Deposit = () => {
  return (
    <div className="deposit-container">
      <h1>your deposits</h1>
      <div className="details">
        <div className="content">
          <h2>100$ BUSD</h2>
          <p>plan: 30Days</p>
          <p>Profit:0.002</p>
        </div>
        <div className="buttons">
          <Button variant="secondary">Withdrawal</Button>
          <Button variant="primary">Claim</Button>
        </div>
      </div>
    </div>
  )
}

export default Deposit
