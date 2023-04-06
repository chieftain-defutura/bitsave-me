import React from 'react'
import './Deposit.scss'
import Button from 'components/Button/Button'

const Deposit: React.FC = () => {
  return (
    <div className="card-2">
      <div className="deposit-container">
        <h1>your deposits</h1>
        <div className="deposit">
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>1. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>2. 100$</h2>
                <h2>BUSD</h2>
              </div>

              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>3. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
          <div className="details">
            <div className="content">
              <div className="flex-content">
                <h2>4. 100$</h2>
                <h2>BUSD</h2>
              </div>
              <p>plan: 30Days</p>
              <p>Profit:0.002</p>
            </div>
            <div className="buttons">
              <div className="withdrawal-btn">
                <Button varient="secondary">Withdrawal</Button>
              </div>
              <Button varient="waring">Claim</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit
